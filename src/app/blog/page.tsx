import Image from "next/image";
import Link from "next/link";
import { PushCta } from "@/components/home/push-cta";
import { PageTransition } from "@/components/motion/page-transition";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { posts } from "@/lib/blog";
import { formatDate } from "@/lib/blog-parse";
import { pageGraph } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const meta = {
  title: "Blog de Direito Previdenciário",
  description:
    "Aposentadoria, benefícios do INSS e mudanças nas regras explicados em linguagem simples pela advogada previdenciária Andressa Ceccon.",
  path: "/blog",
};

export const metadata = pageMetadata(meta);

export default function BlogPage() {
  return (
    <PageTransition>
      <JsonLd
        data={pageGraph({
          type: "CollectionPage",
          path: meta.path,
          name: meta.title,
          description: meta.description,
          trail: [{ name: "Início", path: "/" }, { name: "Blog", path: meta.path }],
          extra: [
            {
              "@type": "ItemList",
              itemListElement: posts.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: p.title,
                url: absoluteUrl(`/blog/${p.slug}`),
              })),
            },
          ],
        })}
      />
      <PageHeader
        crumbs={[{ label: "Início", href: "/" }, { label: "Blog" }]}
        title="Blog"
        lead="Explicações sobre aposentadoria, benefícios do INSS e mudanças nas regras, para você chegar à conversa com o escritório já sabendo o essencial."
      />

      <section className="container-x pb-24 md:pb-40" aria-label="Posts">
        {posts.length === 0 ? (
          <p className="body-md text-ash">Nenhum post publicado ainda.</p>
        ) : (
          <Reveal as="ul" className="border-t border-ink/10" stagger={0.04}>
            {posts.map((p) => (
              <li key={p.slug} className="border-b border-ink/10">
                <Link
                  href={`/blog/${p.slug}`}
                  prefetch
                  className="group grid grid-cols-12 items-center gap-x-[var(--grid-gutter)] gap-y-5 py-8 md:py-10"
                >
                  <span className="relative col-span-12 aspect-[16/10] overflow-hidden rounded-[4px] md:col-span-3 md:aspect-[4/3]">
                    <Image
                      src={p.cover}
                      alt={p.coverAlt}
                      fill
                      sizes="(min-width: 768px) 25vw, 100vw"
                      className="object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-105"
                    />
                  </span>
                  <div className="col-span-12 md:col-span-8 md:col-start-5">
                    <p className="label-mono text-ash">
                      <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.readingMinutes} min de leitura
                    </p>
                    <h2 className="heading-sm mt-3 text-balance transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3">
                      {p.title}
                    </h2>
                    <p className="body-sm mt-3 max-w-[60ch] text-ash">{p.description}</p>
                  </div>
                </Link>
              </li>
            ))}
          </Reveal>
        )}
      </section>

      <PushCta />
    </PageTransition>
  );
}
