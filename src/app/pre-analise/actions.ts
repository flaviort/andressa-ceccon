"use server";

import { preAnaliseQuestions } from "@/content/pre-analise";
import { sendToInbox } from "@/lib/mail";

export type PreAnaliseValues = Record<string, string>;

export type PreAnaliseState =
  | { status: "idle" }
  | { status: "ok"; whatsapp: string }
  // `whatsapp` is set when the answers are complete but the e-mail failed, so
  // the visitor can still send them by WhatsApp.
  | { status: "error"; message: string; values: PreAnaliseValues; whatsapp?: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (data: FormData, key: string, max: number) => String(data.get(key) ?? "").trim().slice(0, max);

export async function sendPreAnalise(_prev: PreAnaliseState, data: FormData): Promise<PreAnaliseState> {
  const values: PreAnaliseValues = {
    nome: text(data, "nome", 120),
    email: text(data, "email", 200),
    telefone: text(data, "telefone", 40),
  };
  for (const q of preAnaliseQuestions) values[q.name] = text(data, q.name, 80);
  const fail = (message: string, whatsapp?: string): PreAnaliseState => ({ status: "error", message, values, whatsapp });

  // Hidden field that people never see. Bots fill it; pretend it went through.
  if (text(data, "empresa", 200)) return { status: "ok", whatsapp: "" };

  if (!values.nome) return fail("Informe o seu nome.");
  if (!EMAIL.test(values.email)) return fail("O e-mail parece incompleto. Confira, por favor.");
  if (!values.telefone) return fail("Informe o seu WhatsApp com DDD.");
  const missing = preAnaliseQuestions.find((q) => !(q.options as readonly string[]).includes(values[q.name]));
  if (missing) return fail(`Responda: ${missing.label}`);

  const answers = preAnaliseQuestions.map((q) => `${q.label} ${values[q.name]}`);
  const contact = [`Nome: ${values.nome}`, `E-mail: ${values.email}`, `WhatsApp: ${values.telefone}`];
  const whatsapp = ["Olá! Gostaria de uma pré-análise previdenciária.", "", ...contact, "", ...answers].join("\n");

  const sent = await sendToInbox({
    tag: "pre-analise",
    subject: `Pré-análise pelo site: ${values.nome}`,
    text: [...contact, "", ...answers].join("\n"),
    replyTo: values.email,
  });
  if (!sent) return fail("Não foi possível enviar agora. Você pode mandar as mesmas respostas pelo WhatsApp:", whatsapp);
  return { status: "ok", whatsapp };
}
