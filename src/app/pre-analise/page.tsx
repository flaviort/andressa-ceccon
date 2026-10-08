import { PageTransition } from "@/components/motion/page-transition";
import { PageHeader } from "@/components/ui/page-header";
import { PreAnaliseForm } from "@/components/ui/pre-analise-form";
import { JsonLd } from "@/components/ui/json-ld";
import { pageGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const meta = {
  title: "Pré-análise de Aposentadoria Online",
  description:
    "Responda cinco perguntas sobre idade, tempo de contribuição e trabalho especial ou rural e receba uma orientação inicial sobre a sua aposentadoria.",
  path: "/pre-analise",
};

export const metadata = pageMetadata(meta);

export default function PreAnalisePage() {
  return (
    <PageTransition>
      <JsonLd
        data={pageGraph({
          path: meta.path,
          name: meta.title,
          description: meta.description,
          trail: [{ name: "Início", path: "/" }, { name: "Pré-análise", path: meta.path }],
        })}
      />
      <PageHeader crumbs={[{ label: "Início", href: "/" }, { label: "Pré-análise" }]} title="Pré-análise da sua aposentadoria" />
      <section className="container-x grid grid-cols-12 gap-x-[var(--grid-gutter)] gap-y-12 pb-24 md:pb-40">
        <div className="col-span-12 md:col-span-4">
          <div className="md:sticky md:top-28">
            <ol className="flex flex-col gap-6">
              <li>
                <span className="label-mono text-ash">Passo 1</span>
                <p className="body-lg mt-2">Preencha seus dados e responda às cinco perguntas.</p>
              </li>
              <li>
                <span className="label-mono text-ash">Passo 2</span>
                <p className="body-lg mt-2">
                  A advogada lê as respostas e diz se vale fazer o planejamento previdenciário completo, que mostra a
                  que benefício você tem direito e qual regra paga mais no seu caso.
                </p>
              </li>
            </ol>
            <p className="body-sm mt-10 text-ash">
              Você mesmo envia as respostas pelo WhatsApp. O site não guarda nenhum dado.
            </p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <PreAnaliseForm />
        </div>
      </section>
    </PageTransition>
  );
}
