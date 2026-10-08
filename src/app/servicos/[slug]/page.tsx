import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PushCta } from "@/components/home/push-cta";
import { PageTransition } from "@/components/motion/page-transition";
import { ClipReveal, Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Button } from "@/components/ui/button";
import { Faq } from "@/components/ui/faq";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { getService, services } from "@/content/services";
import { ids, pageGraph } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/servicos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/servicos/${service.slug}`,
    keywords: service.keywords,
  });
}

function anchor(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ServicePage({ params }: PageProps<"/servicos/[slug]">) {
  // The transition wrapper sits in the static shell; everything that depends on
  // the slug streams inside Suspense. Links to these pages prefetch the
  // content, so in practice it is already there when the transition starts.
  return (
    <PageTransition>
      <Suspense fallback={<div className="min-h-svh" />}>
        <ServiceContent params={params} />
      </Suspense>
    </PageTransition>
  );
}

async function ServiceContent({ params }: { params: PageProps<"/servicos/[slug]">["params"] }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.related.map(getService).filter((s) => s !== undefined);
  const path = `/servicos/${service.slug}`;

  const schema = pageGraph({
    path,
    name: service.metaTitle,
    description: service.metaDescription,
    trail: [
      { name: "Início", path: "/" },
      { name: "Serviços", path: "/servicos" },
      { name: service.title, path },
    ],
    extra: [
      {
        "@type": "Service",
        "@id": `${absoluteUrl(path)}#servico`,
        name: service.title,
        description: service.metaDescription,
        serviceType: "Direito Previdenciário",
        url: absoluteUrl(path),
        image: absoluteUrl(service.image),
        areaServed: { "@type": "Country", name: "Brasil" },
        provider: { "@id": ids.firm },
      },
      {
        "@type": "FAQPage",
        "@id": `${absoluteUrl(path)}#perguntas`,
        mainEntity: service.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  });

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        crumbs={[{ label: "Início", href: "/" }, { label: "Serviços", href: "/servicos" }, { label: service.short }]}
        title={service.title}
        lead={service.lead}
      />

      <div className="container-x">
        <ClipReveal className="relative aspect-[16/10] overflow-hidden rounded-card md:aspect-[21/9]">
          <Image src={service.image} alt={service.imageAlt} fill priority sizes="100vw" className="object-cover" />
        </ClipReveal>
      </div>

      <div className="container-x grid grid-cols-12 gap-x-[var(--grid-gutter)] gap-y-12 py-20 md:py-32">
        <aside className="col-span-12 md:col-span-4 lg:col-span-3">
          <div className="md:sticky md:top-28">
            <p className="label-mono text-ash">Nesta página</p>
            <ul className="mt-4 flex flex-col gap-2 border-l border-ink/10 pl-4">
              {service.sections.map((s) => (
                <li key={s.heading}>
                  <a href={`#${anchor(s.heading)}`} className="body-sm link-u">
                    {s.heading}
                  </a>
                </li>
              ))}
              <li>
                <a href="#documentos" className="body-sm link-u">
                  Documentos
                </a>
              </li>
              <li>
                <a href="#perguntas" className="body-sm link-u">
                  Perguntas frequentes
                </a>
              </li>
            </ul>

            <div className="mt-10 rounded-card bg-ink p-6 text-paper">
              <p className="label-mono text-paper/65">Seu caso</p>
              <p className="heading-xs mt-4">Quer saber se tem direito?</p>
              <p className="body-sm mt-3 text-white/70">Fale com a advogada e receba uma orientação inicial.</p>
              <div className="mt-6 flex flex-col gap-2">
                <Button href={whatsappLink(`Olá! Gostaria de falar sobre ${service.title}.`)} variant="light">
                  WhatsApp
                </Button>
                <Button href="/pre-analise" variant="outline-light">
                  Pré-análise
                </Button>
              </div>
            </div>
          </div>
        </aside>

        <article className="prose-legal col-span-12 md:col-span-8 md:col-start-5 lg:col-span-7 lg:col-start-6">
          {service.sections.map((section, i) => (
            <section key={section.heading} id={anchor(section.heading)} className="scroll-mt-28">
              <h2 className={i === 0 ? "!mt-0" : undefined}>{section.heading}</h2>
              {section.body.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
              {section.list && (
                <ul>
                  {section.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section id="documentos" className="scroll-mt-28 mt-16 rounded-card bg-fog p-6 md:p-10">
            <h2 className="!mt-0">Documentos que costumam ser necessários</h2>
            <ul>
              {service.documents.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="!text-[1rem] text-ash">
              A lista varia conforme o caso. Na primeira conversa indicamos exatamente o que reunir.
            </p>
          </section>
        </article>
      </div>

      <section id="perguntas" className="container-x grid grid-cols-12 gap-x-[var(--grid-gutter)] gap-y-8 scroll-mt-28 pb-24 md:pb-36">
        <SplitReveal as="h2" className="heading-md col-span-12 md:col-span-4">
          Perguntas <br />
          frequentes
        </SplitReveal>
        <div className="col-span-12 md:col-span-8">
          <Faq items={service.faq} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-x pb-24 md:pb-36" aria-labelledby="relacionados">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 id="relacionados" className="heading-sm">
              Veja também
            </h2>
            <Link href="/servicos" className="body-md link-u text-ash">
              Todos os serviços ↗
            </Link>
          </div>
          <Reveal className="grid gap-[var(--grid-gutter)] md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/servicos/${r.slug}`} prefetch className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-fog">
                  <Image src={r.image} alt={r.imageAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-105" />
                </div>
                <div className="mt-4 flex gap-4">
                  <span className="label-mono pt-1 text-bronze">{r.index}</span>
                  <div>
                    <h3 className="text-[1.3125rem] leading-[1.2] font-medium tracking-[-0.02em]">{r.title}</h3>
                    <p className="body-sm mt-2 text-ash">{r.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </Reveal>
        </section>
      )}

      <PushCta />
    </>
  );
}
