import Image from "next/image";
import Link from "next/link";
import { PushCta } from "@/components/home/push-cta";
import { PageTransition } from "@/components/motion/page-transition";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { services } from "@/content/services";
import { pageGraph } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const meta = {
  title: "Serviços de Direito Previdenciário",
  description:
    "Planejamento previdenciário, aposentadorias, pensão por morte, BPC/LOAS, auxílio-doença, salário-maternidade e revisões de benefícios do INSS.",
  path: "/servicos",
};

export const metadata = pageMetadata(meta);

export default function ServicosPage() {
  return (
    <PageTransition>
      <JsonLd
        data={pageGraph({
          type: "CollectionPage",
          path: meta.path,
          name: meta.title,
          description: meta.description,
          trail: [{ name: "Início", path: "/" }, { name: "Serviços", path: meta.path }],
          extra: [
            {
              "@type": "ItemList",
              itemListElement: services.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: s.title,
                url: absoluteUrl(`/servicos/${s.slug}`),
              })),
            },
          ],
        })}
      />
      <PageHeader
        crumbs={[{ label: "Início", href: "/" }, { label: "Serviços" }]}
        title="Serviços"
        lead="Atuamos em todas as etapas da vida previdenciária: do planejamento que antecede a aposentadoria até a revisão de benefícios já concedidos."
      />

      <section className="container-x pb-24 md:pb-40" aria-label="Lista de serviços">
        <Reveal as="ul" className="border-t border-black/10" stagger={0.04}>
          {services.map((s) => (
            <li key={s.slug} className="border-b border-black/10">
              <Link
                href={`/servicos/${s.slug}`}
                prefetch
                className="group grid grid-cols-12 items-center gap-x-[var(--grid-gutter)] gap-y-3 py-6 md:py-8"
              >
                <span className="label-mono col-span-2 text-ash md:col-span-1">{s.index}</span>
                <h2 className="heading-sm col-span-10 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3 md:col-span-5">
                  {s.title}
                </h2>
                <p className="body-sm col-span-10 col-start-3 text-ash md:col-span-4 md:col-start-auto">{s.excerpt}</p>
                <span className="relative col-span-2 hidden aspect-[4/3] overflow-hidden rounded-[10px] md:block">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="16vw"
                    className="scale-110 object-cover opacity-0 transition duration-700 ease-[var(--ease-out-expo)] group-hover:scale-100 group-hover:opacity-100"
                  />
                  <span className="absolute inset-0 grid place-items-center text-2xl transition-opacity duration-300 group-hover:opacity-0">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </Reveal>
      </section>

      <PushCta title={["Não sabe", "por onde", "começar?"]} text="Responda cinco perguntas rápidas e receba uma orientação inicial sobre o seu caso." />
    </PageTransition>
  );
}
