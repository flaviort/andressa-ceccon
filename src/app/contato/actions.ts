"use server";

import { sendToInbox } from "@/lib/mail";

export type ContactValues = { nome: string; email: string; telefone: string; mensagem: string };

export type ContactState =
  | { status: "idle" }
  | { status: "ok" }
  | { status: "error"; message: string; values: ContactValues };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (data: FormData, key: string, max: number) => String(data.get(key) ?? "").trim().slice(0, max);

export async function sendContact(_prev: ContactState, data: FormData): Promise<ContactState> {
  const values: ContactValues = {
    nome: text(data, "nome", 120),
    email: text(data, "email", 200),
    telefone: text(data, "telefone", 40),
    mensagem: text(data, "mensagem", 5000),
  };
  const fail = (message: string): ContactState => ({ status: "error", message, values });

  // Hidden field that people never see. Bots fill it; pretend it went through.
  if (text(data, "empresa", 200)) return { status: "ok" };

  if (!values.nome) return fail("Informe o seu nome.");
  if (!values.mensagem) return fail("Escreva uma mensagem.");
  if (values.email && !EMAIL.test(values.email)) return fail("O e-mail parece incompleto. Confira ou deixe em branco.");

  const body = [
    `Nome: ${values.nome}`,
    `E-mail: ${values.email || "não informado"}`,
    `Telefone: ${values.telefone || "não informado"}`,
    "",
    values.mensagem,
  ].join("\n");

  const sent = await sendToInbox({
    tag: "contato",
    subject: `Contato pelo site: ${values.nome}`,
    text: body,
    replyTo: values.email,
  });
  if (!sent) return fail("Não foi possível enviar agora. Tente de novo em alguns minutos ou fale pelo WhatsApp.");
  return { status: "ok" };
}
