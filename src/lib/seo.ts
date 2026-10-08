import type { Metadata } from "next";
import { site } from "@/lib/site";

const BRAND = "Andressa Ceccon";
/** Titles longer than this get cut off in search results, so the brand suffix is dropped. */
const TITLE_MAX = 60;

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Skip the "| Andressa Ceccon" suffix (used by the home page). */
  absoluteTitle?: boolean;
  keywords?: string[];
  /** Marks the page as an article (blog posts) for Open Graph. Dates in AAAA-MM-DD. */
  article?: { publishedTime: string; modifiedTime: string };
};

/**
 * Every page goes through here so canonical, Open Graph and Twitter tags
 * describe the page itself. Next replaces `openGraph` wholesale, so a page
 * that sets only part of it would lose the rest; never write it by hand.
 * The og:image comes from each route's opengraph-image file.
 */
export function pageMetadata({ title, description, path, absoluteTitle, keywords, article }: PageMeta): Metadata {
  const withBrand = `${title} | ${BRAND}`;
  const fullTitle = absoluteTitle || withBrand.length > TITLE_MAX ? title : withBrand;
  const base = { title: fullTitle, description, url: path, siteName: site.name, locale: "pt_BR" };
  return {
    title: { absolute: fullTitle },
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: article
      ? { ...base, type: "article", publishedTime: article.publishedTime, modifiedTime: article.modifiedTime, authors: [site.lawyer] }
      : { ...base, type: "website" },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

export const absoluteUrl = (path: string) => (path === "/" ? site.url : `${site.url}${path}`);
