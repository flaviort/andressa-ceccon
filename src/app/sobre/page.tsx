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
  title: "Dra. Andressa Ceccon, Advogada Previdenciária",
  description:
    "Dra. Andressa Ceccon (OAB/PR 74.854), advogada previdenciária em Curitiba há 10 anos. Formada pela PUC/PR e pós-graduada pela EMATRA IX.",
  path: "/sobre",
};

export const metadata = pageMetadata(meta);

const values = [
  {
    title: "Presencial ou online",
    text: "No escritório, no Centro de Curitiba, ou por videochamada e WhatsApp. Os documentos podem ser enviados pelo celular e o andamento fica na área do cliente.",
  },
  {
    title: "Pedido bem montado",
    text: "Antes de protocolar, conferimos o CNIS, juntamos as provas e escrevemos a fundamentação. Um pedido completo costuma receber menos exigências do INSS.",
  },
  {
    title: "Conversa franca",
    text: "Você sabe em que fase o caso está, quais são os riscos e quanto tempo o INSS costuma levar. Não prometemos resultado.",
  },
  {
    title: "Prazos em dia",
    text: "Acompanhamos os prazos do INSS e respondemos às exigências assim que aparecem, para o pedido não ficar parado.",
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
        wide
        title={
          <>
            <span className="block">Quem atende você</span>
            <span className="block">
              <em>conhece o seu caso.</em>
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
          <p className="label-mono text-ash">{site.oab}</p>
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
            A Dra. Andressa Ceccon criou o escritório com uma ideia simples: quem conduz o processo é quem conversa com o
            cliente. Cada estratégia parte da história de trabalho de quem nos procura.
          </ScrubText>
          <div className="body-lg mt-12 grid gap-6 text-[#3a4257] md:grid-cols-2">
            <p>
              Com sede no Centro de Curitiba, atendemos clientes de todo o Brasil. O foco é o planejamento
              previdenciário e os pedidos de benefício ao INSS.
            </p>
            <p>
              Na prática, isso vai da aposentadoria por idade, por tempo de contribuição, especial, rural e da pessoa com
              deficiência até pensão por morte, BPC/LOAS, auxílio-doença, salário-maternidade e revisão de benefícios.
            </p>
          </div>
        </div>
      </section>

      <section data-theme="dark" className="bg-ink py-24 text-paper md:py-36" aria-labelledby="formacao">
        <div className="container-x grid grid-cols-12 gap-x-[var(--grid-gutter)] gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <p className="label-mono text-paper/65">Advogada responsável</p>
            <SplitReveal as="h2" className="heading-lg mt-6">
              <span id="formacao">Dra. Andressa Ceccon</span>
            </SplitReveal>
            <p className="label-mono mt-6 text-paper/65">{site.oab}</p>
          </div>
          <Reveal as="dl" className="col-span-12 grid gap-px overflow-hidden rounded-card bg-white/10 md:col-span-7">
            {[
              ["Graduação", "Bacharela em Direito pela Pontifícia Universidade Católica do Paraná (PUC/PR)"],
              ["Pós-graduação", "Direito e Processo do Trabalho e Direito Previdenciário pela Escola da Associação dos Magistrados do Trabalho do Paraná (EMATRA IX)"],
              ["Atuação", "10 anos de advocacia previdenciária, com foco em planejamento e em pedidos administrativos ao INSS"],
              ["Abrangência", "Escritório em Curitiba/PR e atendimento online para todo o Brasil"],
            ].map(([k, v]) => (
              <div key={k} className="grid gap-2 bg-ink p-6 md:grid-cols-[10rem_1fr] md:p-8">
                <dt className="label-mono pt-1 text-paper/65">{k}</dt>
                <dd className="body-lg text-white/90">{v}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="container-x py-24 md:py-36" aria-labelledby="valores">
        <SplitReveal as="h2" className="heading-md max-w-[16ch]">
          <span id="valores">Como trabalhamos</span>
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

      <PushCta title={["Vamos olhar", "o seu caso?"]} image="/images/idade.jpg" />
    </PageTransition>
  );
}
