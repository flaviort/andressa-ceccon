"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="conteudo" className="container-x flex min-h-svh flex-col justify-end pt-[var(--header-h)] pb-16">
      <p className="label-mono text-bronze">Erro inesperado</p>
      <h1 className="display-lg mt-6 max-w-[12ch]">Algo não saiu como esperado.</h1>
      <p className="body-lg mt-8 max-w-[44ch] text-ash">
        Tente carregar a página de novo. Se o problema continuar, fale com a gente pelo WhatsApp.
      </p>
      <div className="mt-10 flex flex-wrap gap-2">
        <button type="button" onClick={reset} className="btn btn--dark">
          <span className="btn__inner">Tentar novamente</span>
        </button>
        <Link href="/" className="btn">
          <span className="btn__inner">Voltar ao início</span>
        </Link>
      </div>
    </main>
  );
}
