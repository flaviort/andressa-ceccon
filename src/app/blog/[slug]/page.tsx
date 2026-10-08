import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PushCta } from "@/components/home/push-cta";
import { PageTransition } from "@/components/motion/page-transition";
import { ClipReveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { ServiceCards } from "@/components/ui/service-cards";
import { getService } from "@/content/services";
import { getPost, posts } from "@/lib/blog";
import { formatDate } from "@/lib/blog-parse";
import { ids, pageGraph } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    article: { publishedTime: post.date, modifiedTime: post.updated },
  });
}

export default function PostPage({ params }: PageProps<"/blog/[slug]">) {
  // Same shape as the service pages: static transition shell, slug-dependent
  // content inside Suspense, prefetched by every link that points here.
  return (
    <PageTransition>
      <Suspense fallback={<div className="min-h-svh" />}>
        <PostContent params={params} />
      </Suspense>
    </PageTransition>
  );
}

async function PostContent({ params }: { params: PageProps<"/blog/[slug]">["params"] }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const url = absoluteUrl(path);
  const related = post.services.map(getService).filter((s) => s !== undefined);

  const schema = pageGraph({
    path,
    name: post.title,
    description: post.description,
    trail: [
      { name: "Início", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path },
    ],
    extra: [
      {
        "@type": "BlogPosting",
        "@id": `${url}#artigo`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated,
        image: absoluteUrl(post.cover),
        inLanguage: "pt-BR",
        author: { "@id": ids.lawyer },
        publisher: { "@id": ids.firm },
        mainEntityOfPage: { "@id": `${url}#pagina` },
      },
    ],
  });

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        crumbs={[{ label: "Início", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Post" }]}
        title={post.title}
        lead={post.description}
        wide
      >
        <p className="label-mono col-span-12 mt-8 text-ash md:col-span-7 md:col-start-6">
          Por {site.lawyer} · {site.oab} · <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.updated !== post.date && (
            <>
              {" "}
              · atualizado em <time dateTime={post.updated}>{formatDate(post.updated)}</time>
            </>
          )}
        </p>
      </PageHeader>

      <div className="container-x">
        <ClipReveal className="relative aspect-[16/10] overflow-hidden rounded-card md:aspect-[21/9]">
          <Image src={post.cover} alt={post.coverAlt} fill priority sizes="100vw" className="object-cover" />
        </ClipReveal>
      </div>

      <div className="container-x grid grid-cols-12 gap-x-[var(--grid-gutter)] py-20 md:py-32">
        <article
          className="prose-legal col-span-12 md:col-span-8 md:col-start-3 lg:col-span-7 lg:col-start-4"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <p className="body-sm col-span-12 mt-12 border-t border-ink/10 pt-6 text-ash md:col-span-8 md:col-start-3 lg:col-span-7 lg:col-start-4">
          Este texto é informativo e não substitui a análise do seu caso. Cada situação depende dos documentos e do histórico de contribuições.
        </p>
      </div>

      {related.length > 0 && (
        <section className="container-x pb-24 md:pb-36" aria-labelledby="relacionados">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 id="relacionados" className="heading-sm">
              Serviços relacionados
            </h2>
            <Link href="/blog" className="body-md link-u text-ash">
              Todos os posts ↗
            </Link>
          </div>
          <ServiceCards items={related} />
        </section>
      )}

      <PushCta />
    </>
  );
}
