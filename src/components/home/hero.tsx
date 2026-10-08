import Image from "next/image";
import Link from "next/link";
import { HeroVideo } from "@/components/home/hero-video";
import { SplitReveal } from "@/components/motion/split-reveal";
import { preload } from "react-dom";
import { site } from "@/lib/site";

export function Hero() {
  // The poster is the LCP element until the video starts, so fetch it first.
  preload("/video/hero-poster.jpg", { as: "image", fetchPriority: "high" });
  return (
    <section data-theme="dark" className="relative h-svh min-h-[600px] md:p-2" aria-labelledby="hero-title">
      <div className="relative h-full w-full overflow-hidden bg-ink md:rounded-card">
        <HeroVideo src="/video/hero.mp4" poster="/video/hero-poster.jpg" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/70" aria-hidden="true" />

        <div className="relative flex h-full flex-col justify-end px-[calc(var(--grid-margin)-4px)] pb-6 md:px-[calc(var(--grid-margin)+4px)] md:pb-10">
          <div className="grid gap-y-6 lg:grid-cols-[1fr_auto] lg:gap-y-8">
            <p className="label-mono self-end text-white/70 lg:col-start-1 lg:row-start-1">
              Advocacia previdenciária · {site.oab}
            </p>

            <SplitReveal as="h1" trigger="load" className="display-xl text-paper lg:col-span-2 lg:row-start-2" stagger={0.1}>
              <span id="hero-title" className="block">Seu direito.</span>
              <span className="block">Bem planejado.</span>
            </SplitReveal>

            <Link
              href="/pre-analise"
              className="group mt-2 flex w-full max-w-[400px] items-stretch gap-[var(--grid-gutter)] rounded-[14px] bg-white/10 p-2 text-paper backdrop-blur-xl transition-colors hover:bg-white/20 lg:col-start-2 lg:row-start-1 lg:mt-0"
            >
              <span className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-[10px] md:w-28">
                <Image
                  src="/images/maos.jpg"
                  alt=""
                  fill
                  sizes="112px"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110"
                />
              </span>
              <span className="flex flex-col justify-between py-1 pr-2">
                <span className="label-mono text-white/60">Pré-análise</span>
                <span className="body-lg font-medium">Descubra quais regras de aposentadoria se aplicam a você</span>
                <span className="body-sm text-white/70">
                  Começar <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
