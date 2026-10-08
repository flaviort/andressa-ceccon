import { marked } from "marked";
import { parse as parseYaml } from "yaml";

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** AAAA-MM-DD */
  date: string;
  /** AAAA-MM-DD; same as date when the post was never updated. */
  updated: string;
  cover: string;
  coverAlt: string;
  coverSource: string;
  /** Slugs from src/content/services.ts shown at the end of the post. */
  services: string[];
  html: string;
  readingMinutes: number;
};

const FRONT_MATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const REQUIRED = ["title", "description", "date", "cover", "coverAlt", "coverSource"] as const;

/**
 * Pure on purpose (no "@/" imports, no fs) so node:test can load it directly.
 * Errors are in Portuguese because whoever reads them is editing a post.
 */
export function parsePost(slug: string, raw: string): Post {
  const fail = (msg: string): never => {
    throw new Error(`Post "${slug}": ${msg}`);
  };
  const match = raw.match(FRONT_MATTER);
  if (!match) fail("falta o cabeçalho entre --- no topo do arquivo");
  const [, head, body] = match!;
  const fm = (parseYaml(head) ?? {}) as Record<string, unknown>;
  for (const key of REQUIRED) if (!fm[key]) fail(`falta o campo "${key}"`);
  const date = String(fm.date);
  const updated = fm.updated ? String(fm.updated) : date;
  if (!ISO_DATE.test(date) || !ISO_DATE.test(updated)) fail("datas devem estar no formato AAAA-MM-DD");
  if (/^# /m.test(body)) fail("use ## e ### no texto; o título do post já é o h1");

  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: String(fm.title),
    description: String(fm.description),
    date,
    updated,
    cover: String(fm.cover),
    coverAlt: String(fm.coverAlt),
    coverSource: String(fm.coverSource),
    services: Array.isArray(fm.services) ? fm.services.map(String) : [],
    html: marked.parse(body, { async: false, gfm: true }),
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
}

const dateFormat = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function formatDate(iso: string) {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`));
}
