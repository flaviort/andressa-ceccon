"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/site";

const questions = [
  {
    name: "contribuicao",
    label: "Quanto tempo de contribuição você tem, aproximadamente?",
    options: ["Homem, menos de 35 anos", "Homem, 35 anos ou mais", "Mulher, menos de 30 anos", "Mulher, 30 anos ou mais"],
  },
  {
    name: "idade",
    label: "Qual a sua idade?",
    options: ["Homem, menos de 65 anos", "Homem, 65 anos ou mais", "Mulher, menos de 62 anos", "Mulher, 62 anos ou mais"],
  },
  { name: "rural", label: "Já trabalhou em atividade rural?", options: ["Sim", "Não"] },
  { name: "especial", label: "Já trabalhou exposto a algum agente nocivo à saúde?", options: ["Sim", "Não"] },
  { name: "deficiencia", label: "Já trabalhou com alguma deficiência?", options: ["Sim", "Não"] },
] as const;

const field =
  "w-full rounded-btn bg-fog px-4 py-4 text-[18px] tracking-[-0.01em] outline-none transition placeholder:text-ash focus:bg-mist focus:ring-2 focus:ring-ink";

/**
 * There is no backend: the answers are assembled into a WhatsApp message the
 * visitor sends themselves, so nothing is stored by the site.
 */
export function PreAnaliseForm() {
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const missing = questions.find((q) => !data.get(q.name));
    if (missing) {
      setError(`Responda: ${missing.label}`);
      return;
    }
    setError(null);
    const lines = [
      "Olá! Gostaria de uma pré-análise previdenciária.",
      "",
      `Nome: ${data.get("nome")}`,
      `E-mail: ${data.get("email")}`,
      `WhatsApp: ${data.get("telefone")}`,
      "",
      ...questions.map((q) => `${q.label} ${data.get(q.name)}`),
    ];
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-12">
      <fieldset className="grid gap-3">
        <legend className="label-mono mb-4 text-bronze">01 · Seus dados</legend>
        <label className="sr-only" htmlFor="nome">Nome completo</label>
        <input id="nome" name="nome" required autoComplete="name" placeholder="Nome completo" className={field} />
        <div className="grid gap-3 md:grid-cols-2">
          <label className="sr-only" htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="E-mail" className={field} />
          <label className="sr-only" htmlFor="telefone">WhatsApp com DDD</label>
          <input id="telefone" name="telefone" type="tel" required autoComplete="tel" placeholder="WhatsApp com DDD" className={field} />
        </div>
      </fieldset>

      {questions.map((q, i) => (
        <fieldset key={q.name}>
          <legend className="mb-5">
            <span className="label-mono block text-bronze">0{i + 2}</span>
            <span className="heading-xs mt-2 block">{q.label}</span>
          </legend>
          {/* On phones the options fill the row; yes/no pairs split it in half. */}
          <div className={`grid gap-2 md:flex md:flex-wrap ${q.options.length === 2 ? "grid-cols-2" : ""}`}>
            {q.options.map((opt) => (
              <label key={opt} className="cursor-pointer">
                <input type="radio" name={q.name} value={opt} className="peer sr-only" />
                <span className="group/opt body-md flex h-12 items-center gap-3 rounded-btn bg-fog pr-5 pl-4 transition hover:bg-mist peer-checked:bg-ink peer-checked:text-paper peer-checked:hover:bg-ink-deep peer-focus-visible:ring-2 peer-focus-visible:ring-ink peer-focus-visible:ring-offset-2">
                  {/* Radio marker: an empty ring, filled with a gold dot once chosen. */}
                  <span
                    aria-hidden="true"
                    className="grid size-[18px] shrink-0 place-items-center rounded-full ring-[1.5px] ring-ink/35 transition group-hover/opt:ring-ink/60 [:checked+*_&]:ring-gold"
                  >
                    <span className="size-2 scale-0 rounded-full bg-gold transition-transform [:checked+*_&]:scale-100" />
                  </span>
                  {opt}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <div className="flex flex-col gap-4 border-t border-ink/10 pt-8">
        <label className="body-sm flex items-start gap-3 text-ash">
          <input type="checkbox" required className="mt-0.5 size-4 accent-ink" />
          <span>
            Concordo com a{" "}
            <a href="/politica-de-privacidade" className="text-ink underline">
              política de privacidade
            </a>{" "}
            e com o envio destas informações pelo WhatsApp.
          </span>
        </label>
        {error && (
          <p role="alert" className="body-sm text-ink">
            {error}
          </p>
        )}
        <button type="submit" className="btn btn--dark w-fit">
          <span className="btn__inner">
            <span className="btn__icon btn__icon--lead" aria-hidden="true">→</span>
            <span>Enviar pelo WhatsApp</span>
            <span className="btn__icon btn__icon--trail" aria-hidden="true">→</span>
          </span>
        </button>
      </div>
    </form>
  );
}
