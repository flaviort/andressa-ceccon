"use client";

import { whatsappLink } from "@/lib/site";

const field =
  "w-full rounded-btn bg-white/10 px-4 py-4 text-[17px] tracking-[-0.01em] text-paper outline-none transition placeholder:text-white/50 focus:bg-white/15 focus:ring-2 focus:ring-paper";

export function ContactForm() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = [`Olá! Meu nome é ${data.get("nome")}.`, "", String(data.get("mensagem"))].join("\n");
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <label htmlFor="c-nome" className="sr-only">Nome</label>
      <input id="c-nome" name="nome" required autoComplete="name" placeholder="Nome" className={field} />
      <label htmlFor="c-msg" className="sr-only">Mensagem</label>
      <textarea id="c-msg" name="mensagem" required rows={5} placeholder="Conte brevemente a sua situação" className={`${field} resize-none`} />
      <label className="body-sm mt-2 flex items-start gap-3 text-white/60">
        <input type="checkbox" required className="mt-0.5 size-4 accent-paper" />
        <span>
          Concordo com a{" "}
          <a href="/politica-de-privacidade" className="text-paper underline">
            política de privacidade
          </a>
          .
        </span>
      </label>
      <button type="submit" className="btn btn--light mt-4 w-fit">
        <span className="btn__inner">
          <span className="btn__icon btn__icon--lead" aria-hidden="true">→</span>
          <span>Enviar pelo WhatsApp</span>
          <span className="btn__icon btn__icon--trail" aria-hidden="true">→</span>
        </span>
      </button>
    </form>
  );
}
