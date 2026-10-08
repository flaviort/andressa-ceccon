import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { site } from "@/lib/site";

// Bump when page content changes; search engines use it to decide what to recrawl.
const UPDATED = new Date("2026-10-07");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/sobre", "/servicos", "/pre-analise", "/contato", "/politica-de-privacidade"];
  return [
    ...pages.map((p) => ({
      url: `${site.url}${p}`,
      lastModified: UPDATED,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : p === "/politica-de-privacidade" ? 0.2 : 0.8,
    })),
    ...services.map((s) => ({
      url: `${site.url}/servicos/${s.slug}`,
      lastModified: UPDATED,
      changeFrequency: "monthly" as const,
      priority: s.slug === "planejamento-previdenciario" ? 0.95 : 0.9,
    })),
  ];
}
