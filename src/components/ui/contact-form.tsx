"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/contato/actions";
import { whatsappLink } from "@/lib/site";

const field =
  "w-full rounded-btn bg-white/10 px-4 py-4 text-[18px] tracking-[-0.01em] text-paper outline-none transition placeholder:text-white/50 focus:bg-white/15 focus:ring-2 focus:ring-paper";

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });

  if (state.status === "ok") {
    return (
      <div role="status" className="rounded-btn bg-white/10 p-6">
        <p className="heading-xs">Mensagem enviada.</p>
        <p className="body-md mt-3 text-white/75">
          Obrigada pelo contato. Se quiser conversar agora, fale pelo{" "}
          <a href={whatsappLink("Olá! Acabei de enviar uma mensagem pelo site.")} target="_blank" rel="noopener noreferrer" className="text-paper underline">
            WhatsApp
          </a>
          .
        </p>
      </div>
    );
  }

  // React resets the form after the action; defaultValue puts the answers back
  // when it comes back with an error.
  const v = state.status === "error" ? state.values : undefined;

  return (
    <form action={action} className="grid gap-3">
      <label htmlFor="c-nome" className="sr-only">Nome</label>
      <input id="c-nome" name="nome" required maxLength={120} autoComplete="name" placeholder="Nome" defaultValue={v?.nome} className={field} />
      <div className="grid gap-3 sm:grid-cols-2">
        <label htmlFor="c-email" className="sr-only">E-mail (opcional)</label>
        <input id="c-email" name="email" type="email" maxLength={200} autoComplete="email" placeholder="E-mail (opcional)" defaultValue={v?.email} className={field} />
        <label htmlFor="c-tel" className="sr-only">Telefone com DDD (opcional)</label>
        <input id="c-tel" name="telefone" type="tel" maxLength={40} autoComplete="tel" placeholder="Telefone com DDD (opcional)" defaultValue={v?.telefone} className={field} />
      </div>
      <label htmlFor="c-msg" className="sr-only">Mensagem</label>
      <textarea id="c-msg" name="mensagem" required maxLength={5000} rows={5} placeholder="Conte brevemente a sua situação" defaultValue={v?.mensagem} className={`${field} resize-none`} />
      {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
      <input name="empresa" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] size-px opacity-0" />
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
      {state.status === "error" && (
        <p role="alert" className="body-sm text-paper">
          {state.message}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn btn--light mt-4 w-fit disabled:opacity-60">
        <span className="btn__inner">
          <span className="btn__icon btn__icon--lead" aria-hidden="true">→</span>
          <span>{pending ? "Enviando" : "Enviar mensagem"}</span>
          <span className="btn__icon btn__icon--trail" aria-hidden="true">→</span>
        </span>
      </button>
    </form>
  );
}
