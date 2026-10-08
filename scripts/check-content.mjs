#!/usr/bin/env node
// Mechanical checks for the brand, OAB and SEO rules (CLAUDE.md and _docs).
// Anything that needs judgment lives in the revisar skill, not here.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { parse as parseYaml } from "yaml";
import { readJpegComments } from "./jpeg-comment.mjs";

const DASH = "\u2014";
const EMOJI = /\p{Emoji_Presentation}|\uFE0F/u;
const phrase = (src) => new RegExp(`(?<!\\p{L})(?:${src})(?!\\p{L})`, "iu");

/**
 * Phrases ruled out by the OAB advertising rules (Provimento 205/2021) and by
 * the project. Checked only in what the public reads (src/). Add to the list
 * when a new case shows up; keep each pattern narrow enough to let ordinary
 * uses through ("o melhor momento", "garantir a renda").
 */
export const BANNED = [
  { re: phrase("(?:o|a|os|as) melhor(?:es)? (?:escrit[oó]rio|advogad[oa]s?|equipe|atendimento)"), why: "comparação de qualidade" },
  { re: phrase("garantimos"), why: "promessa de resultado" },
  { re: phrase("(?:resultado|[eê]xito|sucesso|aprova[cç][aã]o|benef[ií]cio) garantid[oa]"), why: "promessa de resultado" },
  { re: phrase("garantia de (?:resultado|[eê]xito|sucesso|aprova[cç][aã]o)"), why: "promessa de resultado" },
  { re: /100\s?% (?:online|de [eê]xito|de sucesso|de aprova[cç][aã]o)/iu, why: "o atendimento é presencial e online; sem promessa de êxito" },
  { re: phrase("(?:consulta|an[aá]lise|atendimento)s? (?:gratuit[ao]s?|gr[aá]tis)"), why: "oferta gratuita como captação de clientes" },
  { re: /honor[aá]rios?[^.\n]{0,40}R\$\s?\d/iu, why: "menção a preço" },
];

export function textIssues(file, text, { banned = false } = {}) {
  const issues = [];
  text.split("\n").forEach((line, i) => {
    const add = (message) => issues.push({ file, line: i + 1, message });
    if (line.includes(DASH)) add("travessão: troque por vírgula, dois-pontos, parênteses ou ponto");
    if (EMOJI.test(line)) add("emoji");
    if (banned) for (const b of BANNED) if (b.re.test(line)) add(`termo vetado (${b.why})`);
  });
  return issues;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const REQUIRED = ["title", "description", "date", "cover", "coverAlt", "coverSource"];

export function postIssues(file, raw, { serviceSlugs, publicDir }) {
  const issues = [];
  const add = (message) => issues.push({ file, line: 1, message });
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return [{ file, line: 1, message: "falta o cabeçalho entre --- no topo do arquivo" }];
  let fm;
  try {
    fm = parseYaml(match[1]) ?? {};
  } catch (error) {
    return [{ file, line: 1, message: `cabeçalho inválido: ${error.message}` }];
  }
  for (const key of REQUIRED) if (!fm[key]) add(`falta o campo "${key}"`);
  const description = String(fm.description ?? "");
  if (description.length > 155) add(`description com ${description.length} caracteres (máximo 155)`);
  for (const key of ["date", "updated"]) {
    if (fm[key] && !ISO_DATE.test(String(fm[key]))) add(`${key} deve estar no formato AAAA-MM-DD`);
  }
  if (fm.updated && fm.date && String(fm.updated) < String(fm.date)) add("updated é anterior a date");
  if (fm.cover) {
    const cover = String(fm.cover);
    if (!cover.startsWith("/images/") || !cover.endsWith(".jpg")) add("cover deve ser um arquivo .jpg dentro de /images/");
    else if (!existsSync(join(publicDir, cover))) add(`a imagem ${cover} não existe em public/`);
  }
  if (fm.services !== undefined && !Array.isArray(fm.services)) add("services deve ser uma lista, por exemplo [bpc-loas]");
  for (const slug of Array.isArray(fm.services) ? fm.services : []) {
    if (!serviceSlugs.includes(slug)) add(`o serviço "${slug}" não existe em src/content/services.ts`);
  }
  if (/^# /m.test(raw.slice(match[0].length))) add("o texto não pode ter título com um # só (o título do post já é o h1); use ## e ###");
  return issues;
}

export const serviceSlugsFrom = (text) => [...text.matchAll(/^ {4}slug: "([^"]+)"/gm)].map((m) => m[1]);

export function serviceIssues(file, text) {
  const issues = [];
  for (const m of text.matchAll(/metaDescription:\s*"((?:[^"\\]|\\.)*)"/g)) {
    if (m[1].length > 155) {
      issues.push({ file, line: text.slice(0, m.index).split("\n").length, message: `metaDescription com ${m[1].length} caracteres (máximo 155)` });
    }
  }
  return issues;
}

export function imageIssues(images, imageryMd) {
  const issues = [];
  for (const { rel, comments } of images) {
    const file = `public/images/${rel}`;
    if (!imageryMd.includes(`\`${rel}\``)) issues.push({ file, line: 1, message: "imagem sem registro em _docs/imagery.md" });
    if (comments && !comments.some((c) => c.startsWith("Source:"))) {
      issues.push({ file, line: 1, message: "JPEG sem a origem gravada (use npm run tag-image)" });
    }
  }
  return issues;
}

function walk(dir, exts) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return walk(path, exts);
    return exts.includes(extname(name).toLowerCase()) ? [path] : [];
  });
}

function main() {
  const read = (f) => readFileSync(f, "utf8");
  const servicesFile = "src/content/services.ts";
  const servicesText = read(servicesFile);
  const issues = [];

  for (const f of walk("src", [".ts", ".tsx", ".md", ".css"])) issues.push(...textIssues(f, read(f), { banned: true }));
  const docs = [...walk("_docs", [".md"]), ...walk(".claude/skills", [".md"]), "CLAUDE.md", "README.md"];
  for (const f of docs.filter(existsSync)) issues.push(...textIssues(f, read(f)));
  issues.push(...serviceIssues(servicesFile, servicesText));
  const serviceSlugs = serviceSlugsFrom(servicesText);
  for (const f of walk("src/content/blog", [".md"])) issues.push(...postIssues(f, read(f), { serviceSlugs, publicDir: "public" }));
  const images = walk("public/images", [".jpg", ".jpeg", ".png", ".webp", ".avif"]).map((f) => ({
    rel: relative("public/images", f).split(sep).join("/"),
    comments: /\.jpe?g$/i.test(f) ? readJpegComments(readFileSync(f)) : null,
  }));
  issues.push(...imageIssues(images, read("_docs/imagery.md")));

  if (issues.length > 0) {
    console.error(`npm run check encontrou ${issues.length} problema(s):\n`);
    for (const i of issues) console.error(`  ${i.file}:${i.line}  ${i.message}`);
    process.exit(1);
  }
  console.log("npm run check: tudo certo.");
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
