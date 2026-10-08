"use client";

import { useActionState } from "react";
import { sendPreAnalise, type PreAnaliseState } from "@/app/pre-analise/actions";
import { preAnaliseQuestions } from "@/content/pre-analise";
import { whatsappLink } from "@/lib/site";

const questions = preAnaliseQuestions;

const field =
  "w-full rounded-btn bg-fog px-4 py-4 text-[1.125rem] tracking-[-0.01em] outline-none transition placeholder:text-ash focus:bg-mist focus:ring-2 focus:ring-ink";
// Labels stay visible above the fields: a placeholder disappears as soon as
// someone types, and then nothing says what the field was.
const labelText = "body-sm font-medium";
// Side-by-side fields sit at the bottom of their column at their own height,
// so they line up even when one label wraps.
const fieldWrap = "flex flex-col justify-end gap-2";

function WhatsAppButton({ message, dark = true }: { message: string; dark?: boolean }) {
  return (
    <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className={`btn ${dark ? "btn--dark" : "btn--outline"} w-fit`}>
      <span className="btn__inner">
        <span className="btn__icon btn__icon--lead" aria-hidden="true">→</span>
        <span>Enviar pelo WhatsApp</span>
        <span className="btn__icon btn__icon--trail" aria-hidden="true">→</span>
      </span>
    </a>
  );
}

/**
 * The answers go to the firm by e-mail (see actions.ts). Afterwards the visitor
 * can also send them by WhatsApp, which is also the way out when the e-mail
 * fails. Nothing is stored by the site.
 */
export function PreAnaliseForm() {
  const [state, action, pending] = useActionState<PreAnaliseState, FormData>(sendPreAnalise, { status: "idle" });

  if (state.status === "ok") {
    return (
      <div role="status" className="flex flex-col gap-6 rounded-btn bg-fog p-6 md:p-8">
        <div>
          <p className="heading-xs">Respostas enviadas.</p>
          <p className="body-md mt-3 text-ash">
            Obrigada. A Dra. Andressa vai ler as suas respostas e retornar pelo WhatsApp ou pelo e-mail que você
            informou. Se quiser adiantar a conversa, mande também pelo WhatsApp.
          </p>
        </div>
        {state.whatsapp && <WhatsAppButton message={state.whatsapp} />}
      </div>
    );
  }

  // React resets the form after the action; the default values put the
  // answers back when it comes back with an error.
  const v = state.status === "error" ? state.values : undefined;

  return (
    <form action={action} className="flex flex-col gap-12">
      <fieldset className="grid gap-5">
        <legend className="label-mono mb-4 text-bronze">01 · Seus dados</legend>
        <label className={fieldWrap}>
          <span className={labelText}>Nome completo</span>
          <input name="nome" required maxLength={120} autoComplete="name" defaultValue={v?.nome} className={field} />
        </label>
        <div className="grid gap-5 md:grid-cols-2 md:gap-3">
          <label className={fieldWrap}>
            <span className={labelText}>E-mail</span>
            <input name="email" type="email" required maxLength={200} autoComplete="email" defaultValue={v?.email} className={field} />
          </label>
          <label className={fieldWrap}>
            <span className={labelText}>WhatsApp com DDD</span>
            <input name="telefone" type="tel" required autoComplete="tel" placeholder="(41) 99999-9999" maxLength={40} defaultValue={v?.telefone} className={field} />
          </label>
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
                <input type="radio" name={q.name} value={opt} defaultChecked={v?.[q.name] === opt} className="peer sr-only" />
                <span className="group/opt body-md flex min-h-12 items-center py-2 gap-3 rounded-btn bg-fog pr-5 pl-4 transition hover:bg-mist peer-checked:bg-ink peer-checked:text-paper peer-checked:hover:bg-ink-deep peer-focus-visible:ring-2 peer-focus-visible:ring-ink peer-focus-visible:ring-offset-2">
                  {/* Radio marker: an empty ring, filled with a gold dot once chosen. */}
                  <span
                    aria-hidden="true"
                    className="grid size-[1.125rem] shrink-0 place-items-center rounded-full ring-[1.5px] ring-ink/35 transition group-hover/opt:ring-ink/60 [:checked+*_&]:ring-gold"
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

      {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
      <input name="empresa" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] size-px opacity-0" />

      <div className="flex flex-col gap-4 border-t border-ink/10 pt-8">
        <label className="body-sm flex items-start gap-3 text-ash">
          <input type="checkbox" required className="mt-0.5 size-4 accent-ink" />
          <span>
            Concordo com a{" "}
            <a href="/politica-de-privacidade" className="text-ink underline">
              política de privacidade
            </a>{" "}
            e com o envio destas informações ao escritório.
          </span>
        </label>
        {state.status === "error" && (
          <div role="alert" className="flex flex-col gap-4">
            <p className="body-sm text-ink">{state.message}</p>
            {state.whatsapp && <WhatsAppButton message={state.whatsapp} dark={false} />}
          </div>
        )}
        <button type="submit" disabled={pending} className="btn btn--dark w-fit disabled:opacity-60">
          <span className="btn__inner">
            <span className="btn__icon btn__icon--lead" aria-hidden="true">→</span>
            <span>{pending ? "Enviando" : "Enviar respostas"}</span>
            <span className="btn__icon btn__icon--trail" aria-hidden="true">→</span>
          </span>
        </button>
      </div>
    </form>
  );
}
