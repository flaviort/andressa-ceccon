import Image from "next/image";
import Link from "next/link";
import { preload } from "react-dom";
import { HeroVideo } from "@/components/home/hero-video";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Hero() {
  // The poster is the LCP element until the video starts, so fetch it first.
  preload("/video/balanca-justica.jpg", { as: "image", fetchPriority: "high" });
  return (
    <section data-theme="dark" className="relative h-svh min-h-[640px] overflow-hidden bg-ink" aria-labelledby="hero-title">
      <HeroVideo src="/video/balanca-justica.mp4" poster="/video/balanca-justica.jpg" />
      {/* Navy wash: heavier on the left where the headline sits, lighter on the right. */}
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,27,51,0.88)_0%,rgba(27,40,72,0.6)_45%,rgba(27,40,72,0.15)_100%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-deep/80 to-transparent" aria-hidden="true" />

      <div className="container-x relative flex h-full flex-col justify-end pb-10 md:pb-14">
        <div className="grid items-end gap-y-10 lg:grid-cols-12 lg:gap-x-[var(--grid-gutter)]">
          <div className="lg:col-span-8">
            <p className="label-mono text-gold">Advocacia previdenciária · {site.oab}</p>
            <SplitReveal as="h1" trigger="load" className="display-xl mt-6 text-paper md:mt-8" stagger={0.1}>
              <span id="hero-title" className="block">Seu direito,</span>
              <span className="block">
                <em>bem planejado.</em>
              </span>
            </SplitReveal>
            <p className="body-lg mt-6 max-w-[46ch] text-paper/80 md:mt-8">
              Planejamento de aposentadoria e benefícios do INSS com a Dra. Andressa Ceccon. No escritório em Curitiba
              ou online, em todo o Brasil.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <Button href="/pre-analise" variant="gold">
                Solicitar pré-análise
              </Button>
              <Button href="/servicos" variant="glass">
                Conheça os serviços
              </Button>
            </div>
          </div>

          <Link
            href="/sobre"
            className="group hidden w-full max-w-[360px] items-stretch gap-[var(--grid-gutter)] justify-self-end rounded-[6px] bg-ink/40 p-2 text-paper ring-1 ring-paper/10 backdrop-blur-xl transition-colors hover:bg-ink/60 lg:col-span-4 lg:flex"
          >
            <span className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-[4px]">
              <Image
                src="/images/andressa.jpg"
                alt=""
                fill
                sizes="96px"
                className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110"
              />
            </span>
            <span className="flex flex-col justify-between py-1 pr-2">
              <span className="label-mono text-gold">O escritório</span>
              <span className="text-[19px] leading-snug font-medium tracking-[-0.015em]">Dra. Andressa Ceccon, 10 anos no Direito Previdenciário</span>
              <span className="body-sm text-paper/70">
                Conhecer <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
