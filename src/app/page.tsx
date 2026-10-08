import Image from "next/image";
import Link from "next/link";
import { Counter } from "@/components/home/counter";
import { Hero } from "@/components/home/hero";
import { ImageGalaxy } from "@/components/home/image-galaxy";
import { PushCta } from "@/components/home/push-cta";
import { ServicesCarousel } from "@/components/home/services-carousel";
import { PageTransition } from "@/components/motion/page-transition";
import { Parallax } from "@/components/motion/parallax";
import { ClipReveal, Reveal } from "@/components/motion/reveal";
import { ScrubText } from "@/components/motion/scrub-text";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Button } from "@/components/ui/button";
import { getService, services } from "@/content/services";
import { pageGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";
import { JsonLd } from "@/components/ui/json-ld";

const meta = {
  title: "Andressa Ceccon | Advogada Previdenciária em Curitiba",
  description:
    "Advogada previdenciária em Curitiba. Planejamento de aposentadoria, pensão por morte, BPC/LOAS, auxílio-doença e revisão do INSS, presencial ou online.",
  path: "/",
};

export const metadata = pageMetadata({ ...meta, absoluteTitle: true });

export default function HomePage() {
  const planning = getService("planejamento-previdenciario")!;

  return (
    <PageTransition>
      <JsonLd
        data={pageGraph({
          path: meta.path,
          name: meta.title,
          description: meta.description,
          trail: [{ name: "Início", path: "/" }],
          extra: [
            {
              "@type": "ItemList",
              name: "Serviços",
              itemListElement: services.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: s.title,
                url: `${site.url}/servicos/${s.slug}`,
              })),
            },
          ],
        })}
      />
      <Hero />

      {/* Intro: two columns, small bold lead + scroll-filled statement */}
      <section className="container-x relative z-[1] grid grid-cols-12 gap-x-[var(--grid-gutter)] gap-y-8 py-16 md:py-40">
        <SplitReveal as="h2" className="heading-xs col-span-12 md:col-span-4">
          Advocacia previdenciária em Curitiba, do planejamento ao benefício.
        </SplitReveal>
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <ScrubText className="heading-sm">
            Há 10 anos a Dra. Andressa Ceccon orienta trabalhadores e aposentados sobre os seus direitos no INSS. Ela
            analisa cada caso pessoalmente e acompanha o pedido até a decisão.
          </ScrubText>
          <Button href="/sobre" className="mt-10">
            Conheça o escritório
          </Button>
        </div>
      </section>

      {/* Its tiles drift past the section edges; the neighbours sit at z-[1] so they stay on top. */}
      <ImageGalaxy />

      {/* Featured: large dark card */}
      <section className="md:container-x relative z-[1] my-16 md:my-28" aria-labelledby="destaque-title">
        <div data-theme="dark" className="grid overflow-hidden bg-ink text-paper md:grid-cols-12 md:rounded-card">
          <Parallax className="relative aspect-[4/3] md:col-span-7 md:aspect-auto md:min-h-[640px]" amount={8}>
            <Image src={planning.image} alt={planning.imageAlt} fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
          </Parallax>
          <div className="flex flex-col justify-between gap-12 p-6 md:col-span-5 md:p-10">
            <div>
              <p className="label-mono text-paper/65">Em destaque</p>
              <SplitReveal as="h2" className="heading-md mt-6">
                <span id="destaque-title">Planejamento Previdenciário</span>
              </SplitReveal>
              <p className="body-md mt-6 max-w-[38ch] text-white/75">
                Depois que o INSS concede a aposentadoria, não dá mais para trocar de regra. O planejamento compara as
                opções antes do pedido, com datas e valores estimados, e você escolhe sabendo o que cada uma paga.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-end lg:justify-between">
              <Button href={`/servicos/${planning.slug}`} variant="outline-light" className="shrink-0">
                Saiba mais
              </Button>
              <Link
                href="/pre-analise"
                className="group relative flex h-40 w-full flex-col justify-between rounded-[6px] bg-white/10 p-4 transition-colors hover:bg-white/20 lg:w-52"
              >
                <span className="label-mono text-paper/65">5 perguntas</span>
                <span className="text-[21px] leading-tight font-medium tracking-[-0.02em]">
                  Fazer a pré-análise <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Online service */}
      <section className="container-x grid grid-cols-12 gap-x-[var(--grid-gutter)] gap-y-8 py-16 md:py-36">
        <SplitReveal as="h2" className="heading-xs col-span-12 md:col-span-4">
          Presencial em Curitiba, <em>online</em> em todo o Brasil.
        </SplitReveal>
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <ScrubText className="heading-sm">
            Quem mora em Curitiba pode vir ao escritório, no Centro. Quem está em outra cidade resolve tudo a distância:
            manda os documentos pelo celular, acompanha o processo pela área do cliente e conversa direto com a
            advogada.
          </ScrubText>
          <div className="mt-10 flex flex-wrap gap-2">
            <Button href={whatsappLink("Olá! Gostaria de agendar um atendimento.")} variant="dark">
              Falar no WhatsApp
            </Button>
            <Button href={site.clientArea} variant="outline" icon="↗">
              Área do cliente
            </Button>
          </div>
        </div>
      </section>

      {/* Lawyer */}
      <section className="container-x grid grid-cols-12 items-end gap-x-[var(--grid-gutter)] gap-y-10 pb-16 md:pb-36" aria-labelledby="advogada-title">
        <ClipReveal className="relative col-span-12 aspect-[4/5] overflow-hidden rounded-card md:col-span-5">
          <Image src="/images/andressa.jpg" alt="Dra. Andressa Ceccon sorrindo, de blazer claro, em seu escritório" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover object-top" />
        </ClipReveal>
        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <p className="label-mono text-ash">Quem conduz o seu caso</p>
          <SplitReveal as="h2" className="heading-lg mt-5">
            <span id="advogada-title">Dra. Andressa Ceccon</span>
          </SplitReveal>
          <p className="body-lg mt-8 max-w-[48ch] text-[#3a4257]">
            Advogada previdenciária há 10 anos, formada em Direito pela PUC/PR e pós-graduada em Direito e Processo do
            Trabalho e Direito Previdenciário pela EMATRA IX. Trabalha principalmente com planejamento previdenciário e
            pedidos de aposentadoria e outros benefícios do INSS.
          </p>
          <Button href="/sobre" className="mt-8">
            Sobre o escritório
          </Button>
        </div>
      </section>

      {/* Snapshot: numbers */}
      <section className="border-y border-ink/10" aria-labelledby="numeros-title">
        <div className="container-x grid grid-cols-12 gap-x-[var(--grid-gutter)]">
          <div className="col-span-12 flex flex-col justify-between gap-8 py-12 md:col-span-5 md:py-16">
            <h2 id="numeros-title" className="heading-sm">
              O escritório em números
            </h2>
            <Button href="/contato" variant="outline" className="self-start">
              Fale com a gente
            </Button>
          </div>
          <div className="col-span-12 border-ink/10 py-12 md:col-span-7 md:border-l md:py-16 md:pl-10">
            <div className="flex items-end justify-between gap-6">
              <p className="label-mono text-ash">Anos de atuação no previdenciário</p>
              <p className="text-[clamp(110px,13vw,210px)] leading-[0.8] font-semibold tracking-[-0.06em]">
                <Counter to={10} />
                <span className="text-ink">.</span>
              </p>
            </div>
            <Reveal as="dl" className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/10 pt-6 md:grid-cols-4">
              {[
                ["Atendimento", "Presencial e online"],
                ["Atuação", "Todo o Brasil"],
                ["Sede", "Curitiba/PR"],
                ["Registro", site.oab],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="label-mono text-ash">{k}</dt>
                  <dd className="body-md mt-2 font-medium">{v}</dd>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <ServicesCarousel items={services} />

      <PushCta />
    </PageTransition>
  );
}
