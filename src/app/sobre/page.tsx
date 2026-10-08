import Image from "next/image";
import { PushCta } from "@/components/home/push-cta";
import { PageTransition } from "@/components/motion/page-transition";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { ScrubText } from "@/components/motion/scrub-text";
import { SplitReveal } from "@/components/motion/split-reveal";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { pageGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const meta = {
  title: "O Escritório e a Dra. Andressa Ceccon",
  description:
    "Conheça a Dra. Andressa Ceccon (OAB/PR 74.854), advogada previdenciária formada pela PUC/PR e pós-graduada pela EMATRA IX, com 10 anos de atuação.",
  path: "/sobre",
};

export const metadata = pageMetadata(meta);

const values = [
  {
    title: "Presencial ou online",
    text: "Atendimento no escritório, no Centro de Curitiba, ou por vídeo e WhatsApp, com o processo acompanhado pela área do cliente.",
  },
  {
    title: "Rigor técnico",
    text: "Cada pedido é montado com a documentação e a fundamentação necessárias para reduzir exigências e negativas do INSS.",
  },
  {
    title: "Transparência",
    text: "Você sabe em que fase está o seu caso, quais são os riscos e o que esperar. Sem promessas, com informação clara.",
  },
  {
    title: "Agilidade",
    text: "Procedimentos organizados para que o seu requerimento chegue ao fim no menor tempo possível.",
  },
];

export default function SobrePage() {
  return (
    <PageTransition>
      <JsonLd
        data={pageGraph({
          type: "AboutPage",
          path: meta.path,
          name: meta.title,
          description: meta.description,
          trail: [{ name: "Início", path: "/" }, { name: "Escritório", path: meta.path }],
        })}
      />
      <PageHeader
        crumbs={[{ label: "Início", href: "/" }, { label: "Escritório" }]}
        title={
          <>
            <span className="block">Responsabilidade,</span>
            <span className="block">dedicação e</span>
            <span className="block">
              <em>pessoalidade.</em>
            </span>
          </>
        }
      />

      {/* Portrait source is 760px wide, so it stays in a narrow column instead of full-bleed. */}
      <div className="container-x grid grid-cols-12 items-end gap-x-[var(--grid-gutter)] gap-y-8">
        <Parallax className="relative col-span-12 aspect-[4/5] rounded-card md:col-span-6 lg:col-span-5" amount={6}>
          <Image
            src="/images/andressa.jpg"
            alt="Dra. Andressa Ceccon sorrindo, de blazer claro, sentada à mesa do escritório"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </Parallax>
        <div className="col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-7">
          <p className="label-mono text-bronze">{site.oab}</p>
          <p className="heading-sm mt-5 max-w-[22ch]">
            Atendimento próximo, do primeiro contato até o primeiro pagamento do benefício.
          </p>
        </div>
      </div>

      <section className="container-x grid grid-cols-12 gap-x-[var(--grid-gutter)] gap-y-8 py-24 md:py-40">
        <SplitReveal as="h2" className="heading-xs col-span-12 md:col-span-4">
          O escritório
        </SplitReveal>
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <ScrubText className="heading-sm">
            O escritório foi idealizado pela Dra. Andressa Ceccon para atuar com responsabilidade, dedicação, excelência e
            pessoalidade. A estratégia de cada caso parte do que o cliente precisa, de forma transparente e ética.
          </ScrubText>
          <div className="body-lg mt-12 grid gap-6 text-[#3a4257] md:grid-cols-2">
            <p>
              Com sede em Curitiba/PR e atuação em todo o território nacional, o escritório é especializado em
              planejamento previdenciário e em requerimentos de benefícios em geral junto ao INSS.
            </p>
            <p>
              Isso inclui todas as regras de aposentadoria, reconhecimento de atividade especial, rural e de pessoa com
              deficiência, pensão por morte, revisões, salário-maternidade, BPC/LOAS e benefícios por incapacidade.
            </p>
          </div>
        </div>
      </section>

      <section data-theme="dark" className="bg-ink py-24 text-paper md:py-36" aria-labelledby="formacao">
        <div className="container-x grid grid-cols-12 gap-x-[var(--grid-gutter)] gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <p className="label-mono text-gold">Advogada responsável</p>
            <SplitReveal as="h2" className="heading-lg mt-6">
              <span id="formacao">Dra. Andressa Ceccon</span>
            </SplitReveal>
            <p className="label-mono mt-6 text-gold">{site.oab}</p>
          </div>
          <Reveal as="dl" className="col-span-12 grid gap-px overflow-hidden rounded-card bg-white/10 md:col-span-7">
            {[
              ["Graduação", "Bacharela em Direito pela Pontifícia Universidade Católica do Paraná (PUC/PR)"],
              ["Pós-graduação", "Direito e Processo do Trabalho e Direito Previdenciário pela Escola da Associação dos Magistrados do Trabalho do Paraná (EMATRA IX)"],
              ["Atuação", "10 anos no mercado previdenciário, com foco em planejamento e na solução administrativa de benefícios junto ao INSS"],
              ["Abrangência", "Sede em Curitiba/PR, clientes em todo o Brasil"],
            ].map(([k, v]) => (
              <div key={k} className="grid gap-2 bg-ink p-6 md:grid-cols-[160px_1fr] md:p-8">
                <dt className="label-mono pt-1 text-gold">{k}</dt>
                <dd className="body-lg text-white/90">{v}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="container-x py-24 md:py-36" aria-labelledby="valores">
        <SplitReveal as="h2" className="heading-md max-w-[16ch]">
          <span id="valores">Compromisso com o seu caso</span>
        </SplitReveal>
        <Reveal className="mt-14 grid gap-x-[var(--grid-gutter)] gap-y-10 border-t border-ink/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div key={v.title}>
              <span className="label-mono text-bronze">0{i + 1}</span>
              <h3 className="heading-xs mt-4">{v.title}</h3>
              <p className="body-sm mt-3 text-ash">{v.text}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <PushCta title={["Seja", "bem-vindo."]} image="/images/idade.jpg" />
    </PageTransition>
  );
}
