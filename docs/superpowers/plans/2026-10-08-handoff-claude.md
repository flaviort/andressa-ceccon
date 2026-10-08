# Kit de entrega para o Claude: plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar o site com blog pronto, uma checagem automática de marca/OAB/SEO e um conjunto de instruções (CLAUDE.md, `_docs/`, skills, permissões) para que a cliente, sem conhecimento técnico, crie e publique conteúdo com o Claude Code sozinha.

**Architecture:** O blog lê arquivos Markdown de `src/content/blog/` no escopo do módulo (`readFileSync`, que o Cache Components trata como previsível e coloca no shell estático) e reaproveita `pageMetadata`, `pageGraph`, `renderOg`, `PageHeader` e `.prose-legal`. Um script Node sem build (`scripts/check-content.mjs`) aplica as regras mecânicas. As skills do projeto em `.claude/skills/` descrevem os fluxos (publicar, revisar, novo post, nova página) e o `CLAUDE.md` fica curto, apontando para `_docs/`.

**Tech Stack:** Next 16.4 (App Router, Cache Components, Partial Prefetching), React 19.3, Tailwind 4, GSAP, `marked` 18 e `yaml` 2 (novas), testes com `node:test` (Node 22.18+ roda `.ts` direto), `gh` CLI.

**Spec:** `docs/superpowers/specs/2026-10-08-handoff-claude-design.md`

## Global Constraints

- Todo texto escrito (copy, docs, comentários, commits, skills) sem travessão (U+2014), sem emoji e com voz humana. O caractere de travessão nunca aparece literalmente em arquivos do kit; no código, use `"\u2014"`.
- Publicidade da advocacia (Provimento 205/2021 da OAB): sem promessa de resultado, sem preço, sem "o melhor". Atendimento presencial em Curitiba e online, nunca "100% online".
- Nenhum arquivo do kit contém usuário do GitHub, time da Vercel ou URL do repositório. Comandos `gh` usam os placeholders `{owner}/{repo}`, que o próprio `gh` resolve. O único endereço fixo é `site.url` em `src/lib/site.ts`.
- Docs e skills em português. Comentários de código em inglês, como no resto do repositório.
- Descrições de SEO com até 155 caracteres. Um h1 por página. Toda página nova usa `pageMetadata()`, `pageGraph()`, `opengraph-image.tsx` via `renderOg`, entrada em `src/app/sitemap.ts` e `<PageTransition>`.
- Paleta, tipografia, unidades e cantos conforme o `CLAUDE.md` atual (ink, ink-deep, gold só no escuro, bronze no claro, paper; Inter Tight 400/500/600 sem itálico; texto em rem; cantos 6px cards, 5px botões, 4px miniaturas).
- Animação respeita `prefers-reduced-motion`. Links para rotas com `params` usam `prefetch`.
- Commits em inglês, no imperativo, como o histórico atual, terminando com `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Antes de escrever código que use uma API do Next, leia o guia em `node_modules/next/dist/docs/` (regra do `AGENTS.md`).

## Mapa de arquivos

| Arquivo | Ação | Responsabilidade |
| --- | --- | --- |
| `scripts/jpeg-comment.mjs` | criar | Ler e gravar o comentário "Source:" de um JPEG; CLI `npm run tag-image` |
| `scripts/check-content.mjs` | criar | Regras mecânicas; CLI `npm run check` |
| `tests/check-content.test.mjs` | criar | Testes do check e do jpeg-comment |
| `src/lib/blog-parse.ts` | criar | Funções puras: `parsePost`, `formatDate` (sem imports com `@/`) |
| `tests/blog-parse.test.ts` | criar | Testes do parser |
| `src/lib/blog.ts` | criar | Lê `src/content/blog/*.md` uma vez; `posts`, `getPost` |
| `src/content/blog/*.md` | criar | Dois posts de exemplo |
| `src/app/blog/page.tsx`, `opengraph-image.tsx` | criar | Listagem |
| `src/app/blog/[slug]/page.tsx`, `opengraph-image.tsx` | criar | Post |
| `src/components/ui/service-cards.tsx` | criar | Cards de serviços relacionados (extraído da página de serviço) |
| `src/lib/seo.ts` | modificar | Opção `article` em `pageMetadata` |
| `src/app/servicos/[slug]/page.tsx` | modificar | Usar `ServiceCards` |
| `src/app/globals.css` | modificar | `.prose-legal` ganha `ol`, `blockquote`, `a`, `h2:first-child` |
| `src/app/sitemap.ts` | modificar | `/blog` e posts |
| `src/lib/site.ts` | modificar | "Blog" no `mainNav` |
| `next.config.ts` | modificar | Remover redirect de `/blog`, incluir posts no trace |
| `package.json`, `tsconfig.json` | modificar | Scripts `check`, `test`, `tag-image`; deps; excluir `tests` do tsc |
| `.claude/settings.json` | criar | Permissões |
| `.claude/skills/{publicar,revisar,novo-post,nova-pagina}/SKILL.md` | criar | Fluxos |
| `_docs/*.md` | criar/modificar | Guias |
| `CLAUDE.md`, `README.md` | reescrever/modificar | Entrada curta e mapa |

---

### Task 1: Checagem automática e etiqueta de imagens

**Files:**
- Create: `scripts/jpeg-comment.mjs`
- Create: `scripts/check-content.mjs`
- Create: `tests/check-content.test.mjs`
- Modify: `package.json` (scripts e dependência `yaml`)
- Modify: `tsconfig.json` (`exclude`)

**Interfaces:**
- Produces: `readJpegComments(buf: Buffer): string[]`, `setJpegSource(buf: Buffer, text: string): Buffer` em `scripts/jpeg-comment.mjs`.
- Produces: `textIssues(file, text, { banned?: boolean })`, `postIssues(file, raw, { serviceSlugs: string[], publicDir: string })`, `serviceIssues(file, text)`, `serviceSlugsFrom(text): string[]`, `imageIssues(images: { rel: string, comments: string[] | null }[], imageryMd: string)`, `BANNED`. Todas retornam `{ file, line, message }[]`.
- Produces: `npm run check`, `npm test`, `npm run tag-image -- <arquivo> "<origem>"`.

- [ ] **Step 1: Instalar `yaml` e preparar scripts**

```bash
npm install yaml@^2.9.1
```

Em `package.json`, `scripts` passa a ser:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "check": "node scripts/check-content.mjs",
  "test": "node --test tests/*.test.mjs tests/*.test.ts",
  "tag-image": "node scripts/jpeg-comment.mjs"
}
```

Em `tsconfig.json`, troque `"exclude": ["node_modules"]` por `"exclude": ["node_modules", "tests"]` (os testes importam `.ts` com extensão, o que o `tsc` do Next recusaria).

- [ ] **Step 2: Escrever os testes que falham**

`tests/check-content.test.mjs`:

```js
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  imageIssues,
  postIssues,
  serviceIssues,
  serviceSlugsFrom,
  textIssues,
} from "../scripts/check-content.mjs";
import { readJpegComments, setJpegSource } from "../scripts/jpeg-comment.mjs";

const DASH = "\u2014";

test("flags dashes and emoji anywhere", () => {
  const issues = textIssues("a.md", `linha boa\nfrase ${DASH} ruim\nok \u{1F600}`);
  assert.deepEqual(
    issues.map((i) => i.line),
    [2, 3],
  );
});

test("does not flag arrows used in the UI", () => {
  assert.equal(textIssues("a.tsx", "Todos os serviços ↗ e →").length, 0);
});

test("flags OAB-banned phrases only when asked", () => {
  const text = "Somos o melhor escritório\nResultado garantido\nGarantimos sua aposentadoria\nConsulta gratuita\nAtendimento 100% online";
  assert.equal(textIssues("a.ts", text).length, 0);
  assert.equal(textIssues("a.ts", text, { banned: true }).length, 5);
});

test("allows legitimate uses of melhor and garantir", () => {
  const text = "o melhor momento para pedir\nmelhor regra de aposentadoria\no INSS deve garantir a renda\ndireito garantido por lei";
  assert.equal(textIssues("a.ts", text, { banned: true }).length, 0);
});

const validPost = `---
title: Regras de transição
description: Curta.
date: 2026-10-08
cover: /images/bpc.jpg
coverAlt: Mãos sobre documentos
coverSource: Shutterstock 2699270509
services: [bpc-loas]
---

## Intertítulo

Texto.
`;

test("accepts a valid post", () => {
  assert.deepEqual(postIssues("p.md", validPost, { serviceSlugs: ["bpc-loas"], publicDir: "public" }), []);
});

test("reports post problems", () => {
  const raw = validPost
    .replace("Curta.", "x".repeat(156))
    .replace("[bpc-loas]", "[nao-existe]")
    .replace("## Intertítulo", "# Título duplicado")
    .replace("coverAlt: Mãos sobre documentos\n", "");
  const messages = postIssues("p.md", raw, { serviceSlugs: ["bpc-loas"], publicDir: "public" }).map((i) => i.message);
  assert.equal(messages.length, 4, messages.join("\n"));
});

test("reports a post without front matter", () => {
  assert.equal(postIssues("p.md", "## Só texto", { serviceSlugs: [], publicDir: "public" }).length, 1);
});

test("reads service slugs and long descriptions", () => {
  const text = `export type Service = {\n  slug: string;\n};\n  {\n    slug: "a",\n    metaDescription:\n      "${"y".repeat(156)}",\n  },\n  {\n    slug: "b",\n    metaDescription: "curta",\n  },`;
  assert.deepEqual(serviceSlugsFrom(text), ["a", "b"]);
  const issues = serviceIssues("s.ts", text);
  assert.equal(issues.length, 1);
  assert.equal(issues[0].line, 6);
});

test("requires every image to be registered and tagged", () => {
  const md = "| `a.jpg` | home |\n| `blog/b.jpg` | post |";
  const images = [
    { rel: "a.jpg", comments: ["Source: Pexels 1"] },
    { rel: "blog/b.jpg", comments: ["Lavc61"] },
    { rel: "c.jpg", comments: ["Source: x"] },
  ];
  assert.deepEqual(
    imageIssues(images, md).map((i) => i.file),
    ["public/images/blog/b.jpg", "public/images/c.jpg"],
  );
});

const tinyJpeg = Buffer.from([
  0xff, 0xd8,
  0xff, 0xfe, 0x00, 0x06, 0x4c, 0x61, 0x76, 0x63,
  0xff, 0xda, 0x00, 0x02, 0x11, 0x22,
  0xff, 0xd9,
]);

test("writes and replaces the Source comment", () => {
  const once = setJpegSource(tinyJpeg, "Pexels 1");
  const twice = setJpegSource(once, "Pexels 2");
  assert.deepEqual(readJpegComments(twice), ["Lavc", "Source: Pexels 2"]);
  // The scan data after SOS must come through untouched.
  assert.equal(twice.subarray(-6).toString("hex"), "00021122ffd9");
});

test("rejects files that are not JPEG", () => {
  assert.throws(() => setJpegSource(Buffer.from("png"), "x"), /JPEG/);
});
```

- [ ] **Step 3: Rodar e ver falhar**

Run: `node --test tests/check-content.test.mjs`
Expected: FAIL com `Cannot find module '.../scripts/check-content.mjs'`.

- [ ] **Step 4: Implementar `scripts/jpeg-comment.mjs`**

```js
#!/usr/bin/env node
// Reads and writes the image origin kept in the JPEG comment (COM segment).
// Usage: npm run tag-image -- public/images/blog/foo.jpg "Pexels 1234567 (https://www.pexels.com/photo/1234567/), Pexels License. Resized."
import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const COM = 0xfe;
const SOS = 0xda;

function segments(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) throw new Error("O arquivo não é um JPEG.");
  const list = [];
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) throw new Error("JPEG inválido.");
    while (buf[i + 1] === 0xff) i++; // fill bytes
    const marker = buf[i + 1];
    if (marker === SOS) return { list, rest: i };
    const end = i + 2 + buf.readUInt16BE(i + 2);
    list.push({ marker, start: i, end });
    i = end;
  }
  throw new Error("JPEG sem dados de imagem.");
}

export function readJpegComments(buf) {
  return segments(buf)
    .list.filter((s) => s.marker === COM)
    .map((s) => buf.subarray(s.start + 4, s.end).toString("utf8"));
}

export function setJpegSource(buf, text) {
  const { list, rest } = segments(buf);
  const keep = list.filter(
    (s) => !(s.marker === COM && buf.subarray(s.start + 4, s.end).toString("utf8").startsWith("Source:")),
  );
  const payload = Buffer.from(`Source: ${text}`, "utf8");
  const header = Buffer.from([0xff, COM, 0, 0]);
  header.writeUInt16BE(payload.length + 2, 2);
  return Buffer.concat([
    buf.subarray(0, 2),
    ...keep.map((s) => buf.subarray(s.start, s.end)),
    header,
    payload,
    buf.subarray(rest),
  ]);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [file, text] = process.argv.slice(2);
  if (!file || !text) {
    console.error('Uso: npm run tag-image -- <arquivo.jpg> "<origem da imagem>"');
    process.exit(1);
  }
  writeFileSync(file, setJpegSource(readFileSync(file), text));
  console.log(`Origem gravada em ${file}.`);
}
```

- [ ] **Step 5: Implementar `scripts/check-content.mjs`**

```js
#!/usr/bin/env node
// Mechanical checks for the brand, OAB and SEO rules (CLAUDE.md and _docs).
// Anything that needs judgment lives in the revisar skill, not here.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { parse as parseYaml } from "yaml";
import { readJpegComments } from "./jpeg-comment.mjs";

const DASH = "\u2014";
const EMOJI = /\p{Emoji_Presentation}|️/u;
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
```

- [ ] **Step 6: Rodar os testes**

Run: `node --test tests/check-content.test.mjs`
Expected: PASS em todos. Se "allows legitimate uses" falhar, ajuste o padrão em `BANNED`, nunca o teste.

- [ ] **Step 7: Rodar o check no site atual e corrigir o que aparecer**

Run: `npm run check`
Expected na primeira vez: só problemas reais. O provável é `public/images/andressa.jpg` sem origem gravada. Corrija com:

```bash
npm run tag-image -- public/images/andressa.jpg "Photo provided by the client (Dra. Andressa Ceccon). Resized."
```

Se aparecer `metaDescription` acima de 155, encurte o texto em `src/content/services.ts` sem mudar o sentido. Rode de novo até `npm run check: tudo certo.`

- [ ] **Step 8: Commit**

```bash
git add scripts tests package.json package-lock.json tsconfig.json public/images src/content/services.ts
git commit -m "Add content check and JPEG source tagging scripts

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Camada de dados do blog

**Files:**
- Create: `src/lib/blog-parse.ts`
- Create: `src/lib/blog.ts`
- Create: `tests/blog-parse.test.ts`
- Modify: `next.config.ts`
- Modify: `package.json` (dependência `marked`)

**Interfaces:**
- Consumes: nada das tasks anteriores.
- Produces (`src/lib/blog-parse.ts`):
  ```ts
  export type Post = {
    slug: string; title: string; description: string;
    date: string; updated: string; // AAAA-MM-DD; updated = date quando ausente
    cover: string; coverAlt: string; coverSource: string;
    services: string[]; html: string; readingMinutes: number;
  };
  export function parsePost(slug: string, raw: string): Post; // lança Error com mensagem em português
  export function formatDate(iso: string): string; // "8 de outubro de 2026"
  ```
- Produces (`src/lib/blog.ts`): `export const posts: Post[]` (mais recentes primeiro), `export function getPost(slug: string): Post | undefined`, `export type { Post }`.

- [ ] **Step 1: Instalar `marked`**

```bash
npm install marked@^18.1.0
```

- [ ] **Step 2: Escrever os testes que falham**

`tests/blog-parse.test.ts`:

```ts
import assert from "node:assert/strict";
import { test } from "node:test";
import { formatDate, parsePost } from "../src/lib/blog-parse.ts";

const raw = `---
title: Regras de transição
description: Resumo curto.
date: 2026-10-08
cover: /images/transicao.jpg
coverAlt: Pessoa lendo documentos
coverSource: Shutterstock 2633039561
services: [aposentadoria-por-idade]
---

## O que mudou

Texto com **destaque**.

- item um
- item dois
`;

test("parses front matter and renders markdown", () => {
  const post = parsePost("regras", raw);
  assert.equal(post.slug, "regras");
  assert.equal(post.title, "Regras de transição");
  assert.equal(post.updated, "2026-10-08");
  assert.deepEqual(post.services, ["aposentadoria-por-idade"]);
  assert.match(post.html, /<h2[^>]*>O que mudou<\/h2>/);
  assert.match(post.html, /<strong>destaque<\/strong>/);
  assert.match(post.html, /<li>item um<\/li>/);
  assert.equal(post.readingMinutes, 1);
});

test("rejects a post without a required field", () => {
  assert.throws(() => parsePost("x", raw.replace("title: Regras de transição\n", "")), /title/);
});

test("rejects a level-one heading in the body", () => {
  assert.throws(() => parsePost("x", raw.replace("## O que mudou", "# O que mudou")), /##/);
});

test("rejects a malformed date", () => {
  assert.throws(() => parsePost("x", raw.replace("2026-10-08", "08/10/2026")), /AAAA-MM-DD/);
});

test("formats dates in Brazilian Portuguese", () => {
  assert.equal(formatDate("2026-10-08"), "8 de outubro de 2026");
});
```

- [ ] **Step 3: Rodar e ver falhar**

Run: `node --test tests/blog-parse.test.ts`
Expected: FAIL com `Cannot find module '.../src/lib/blog-parse.ts'`.

- [ ] **Step 4: Implementar `src/lib/blog-parse.ts`**

```ts
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
```

- [ ] **Step 5: Rodar os testes**

Run: `node --test tests/blog-parse.test.ts`
Expected: PASS. Se `marked.parse` reclamar do tipo de retorno no `tsc`, mantenha `{ async: false }`, que faz o tipo ser `string`.

- [ ] **Step 6: Implementar `src/lib/blog.ts`**

```ts
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parsePost, type Post } from "@/lib/blog-parse";

export type { Post };

const DIR = join(process.cwd(), "src/content/blog");

// Read once at module scope. Cache Components treats readFileSync as
// predictable, so the posts land in the static shell at build time. A broken
// post fails the build with the message from parsePost.
export const posts: Post[] = readdirSync(DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => parsePost(f.slice(0, -3), readFileSync(join(DIR, f), "utf8")))
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
```

Crie a pasta com `mkdir -p src/content/blog` (o primeiro post entra na Task 3).

- [ ] **Step 7: Ajustar `next.config.ts`**

O site antigo não tinha posts (o `post-sitemap.xml` do WordPress está vazio), então o redirect de `/blog` pode sair. Remova a linha:

```ts
      { source: "/blog/:path*", destination: "/servicos", permanent: true },
```

E acrescente, logo depois de `partialPrefetching: true,`:

```ts
  // Posts are read from disk at module scope; keep them in the function bundle
  // for any request that renders a blog route at runtime.
  outputFileTracingIncludes: {
    "/blog/**": ["./src/content/blog/**/*"],
    "/sitemap.xml": ["./src/content/blog/**/*"],
  },
```

Antes, confirme o formato em `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/output.md` (chaves são globs de rota, valores são globs a partir da raiz).

- [ ] **Step 8: Rodar os testes e o lint**

Run: `npm test && npm run lint`
Expected: PASS e lint sem erros.

- [ ] **Step 8: Commit**

```bash
git add src/lib/blog-parse.ts src/lib/blog.ts tests/blog-parse.test.ts next.config.ts package.json package-lock.json
git commit -m "Add Markdown blog data layer

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Rotas do blog e primeiro post

**Files:**
- Create: `src/components/ui/service-cards.tsx`
- Modify: `src/app/servicos/[slug]/page.tsx:555-582` (usar `ServiceCards`)
- Modify: `src/lib/seo.ts` (opção `article`)
- Modify: `src/app/globals.css` (bloco `.prose-legal`)
- Create: `src/app/blog/page.tsx`, `src/app/blog/opengraph-image.tsx`
- Create: `src/app/blog/[slug]/page.tsx`, `src/app/blog/[slug]/opengraph-image.tsx`
- Create: `src/content/blog/regras-de-transicao-da-aposentadoria.md`
- Modify: `src/app/sitemap.ts`
- Modify: `_docs/imagery.md` (coluna "Onde aparece" de `transicao.jpg`)

**Interfaces:**
- Consumes: `posts`, `getPost`, `Post` de `@/lib/blog`; `formatDate` de `@/lib/blog-parse`.
- Produces: `ServiceCards({ items }: { items: Service[] })` em `@/components/ui/service-cards`. `pageMetadata` aceita `article?: { publishedTime: string; modifiedTime: string }`.

- [ ] **Step 1: Extrair `ServiceCards`**

`src/components/ui/service-cards.tsx`, com o markup idêntico ao bloco "Veja também" de `src/app/servicos/[slug]/page.tsx`:

```tsx
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import type { Service } from "@/content/services";

/** Three-up service cards used under service pages and blog posts. */
export function ServiceCards({ items }: { items: Service[] }) {
  return (
    <Reveal className="grid gap-[var(--grid-gutter)] md:grid-cols-3">
      {items.map((r) => (
        <Link key={r.slug} href={`/servicos/${r.slug}`} prefetch className="group block">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-fog">
            <Image
              src={r.image}
              alt={r.imageAlt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-105"
            />
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
  );
}
```

Em `src/app/servicos/[slug]/page.tsx`, troque o `<Reveal className="grid ...">...</Reveal>` dentro da seção `relacionados` por `<ServiceCards items={related} />`, importe o componente e remova os imports que ficarem sem uso (`Image` continua sendo usado pela capa; `Reveal` continua importado só se ainda houver uso; o `npm run lint` aponta).

- [ ] **Step 2: Opção `article` em `pageMetadata`**

Em `src/lib/seo.ts`, acrescente ao tipo `PageMeta`:

```ts
  /** Marks the page as an article (blog posts) for Open Graph. Dates in AAAA-MM-DD. */
  article?: { publishedTime: string; modifiedTime: string };
```

E troque a função para desestruturar `article` e montar o `openGraph` assim:

```ts
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
```

- [ ] **Step 3: Completar `.prose-legal` para Markdown**

Em `src/app/globals.css`, logo depois da regra `.prose-legal strong { ... }`:

```css
.prose-legal > :first-child {
  margin-top: 0;
}
.prose-legal ol {
  margin: 1em 0;
  display: grid;
  gap: 0.6em;
  counter-reset: item;
}
.prose-legal ol > li {
  counter-increment: item;
  padding-left: 2em;
}
/* Numbered lists use the 01, 02 numbering in bronze, like the rest of the site. */
.prose-legal ol > li::before {
  content: counter(item, decimal-leading-zero);
  top: 0.35em;
  width: auto;
  height: auto;
  background: none;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--color-bronze);
}
.prose-legal a {
  color: var(--color-ink);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
}
.prose-legal blockquote {
  margin: 1.6em 0;
  padding-left: 1.2em;
  border-left: 1px solid var(--color-bronze);
}
```

- [ ] **Step 4: Primeiro post de exemplo**

`src/content/blog/regras-de-transicao-da-aposentadoria.md`. Cabeçalho:

```yaml
---
title: Regras de transição da aposentadoria, explicadas sem juridiquês
description: Quem já contribuía antes da Reforma de 2019 pode se aposentar por regras de transição. Veja quais são e como saber qual vale para você.
date: 2026-10-08
cover: /images/transicao.jpg
coverAlt: Pessoa analisando documentos da aposentadoria
coverSource: Shutterstock 2633039561
services: [planejamento-previdenciario, aposentadoria-por-tempo-de-contribuicao, aposentadoria-por-idade]
---
```

Corpo: 600 a 900 palavras, só com `##` e `###`, ao menos uma lista e uma lista numerada (para exercitar o CSS do Step 3). **Use apenas fatos que já estão em `src/content/services.ts`** (seções de `aposentadoria-por-tempo-de-contribuicao`, `aposentadoria-por-idade` e `planejamento-previdenciario`); não introduza idade, pontuação ou prazo que não esteja lá. Estrutura: o que são as regras de transição; quem pode usar; as regras que o `services.ts` descreve, uma por `###`; por que comparar antes de pedir; fecho convidando a conversar com o escritório, sem promessa de resultado. Voz: direta, frases de tamanhos variados, sem travessão, sem emoji. Confira o `alt` contra a foto real (`public/images/transicao.jpg`) e ajuste se não descrever o que aparece.

Em `_docs/imagery.md`, na linha de `transicao.jpg`, acrescente "post regras de transição" à coluna "Onde aparece".

- [ ] **Step 5: Listagem `src/app/blog/page.tsx`**

```tsx
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
```

Confirme que `Reveal` aceita `as` e `stagger` (é usado assim em `src/app/servicos/page.tsx`).

- [ ] **Step 6: Post `src/app/blog/[slug]/page.tsx`**

```tsx
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
```

Leia `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md` antes, para confirmar o comportamento com Cache Components. Confirme que `PageHeader` aceita `wide` e `children` (sim, ver `src/components/ui/page-header.tsx`).

- [ ] **Step 7: Imagens de compartilhamento**

`src/app/blog/opengraph-image.tsx`:

```tsx
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Blog de Direito Previdenciário da Andressa Ceccon Advocacia";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: "Blog", label: "Direito previdenciário", photo: "/images/calculos.jpg" });
}
```

`src/app/blog/[slug]/opengraph-image.tsx`:

```tsx
import { getPost, posts } from "@/lib/blog";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Post do blog da Andressa Ceccon Advocacia";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug) ?? posts[0];
  return renderOg({ title: post.title, label: "Blog", photo: post.cover });
}
```

Em `_docs/imagery.md`, acrescente "OG de /blog" na linha de `calculos.jpg`.

- [ ] **Step 8: Sitemap**

Em `src/app/sitemap.ts`, importe `posts` de `@/lib/blog`, acrescente `"/blog"` ao array `pages` e, no fim do retorno:

```ts
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.updated),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
```

- [ ] **Step 9: Verificar build, check e página**

Run: `npm run check && npm test && npm run lint && npm run build`
Expected: tudo passa; no resumo do build, `/blog` e `/blog/[slug]` aparecem como pré-renderizadas.

Depois, com o servidor `dev` do `.claude/launch.json` (porta 3100), abra `/blog` e `/blog/regras-de-transicao-da-aposentadoria` no navegador e confira: h1 único, capa, listas com traço e com numeração 01/02 em bronze, links sublinhados, cards dos serviços, rodapé, console sem erro, transição de página entre listagem e post, largura de 375px sem rolagem horizontal. Confira também que `/servicos/aposentadoria-por-idade` continua com o "Veja também" igual. Tire um screenshot de cada para o relatório.

- [ ] **Step 10: Commit**

```bash
git add src _docs/imagery.md
git commit -m "Add blog listing and post pages with the first article

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Blog na navegação

**Files:**
- Modify: `src/lib/site.ts` (`mainNav`)

**Interfaces:**
- Consumes: rota `/blog` da Task 3.

- [ ] **Step 1: Acrescentar o item**

Em `src/lib/site.ts`, `mainNav` passa a ser:

```ts
export const mainNav = [
  { label: "Escritório", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Planejamento", href: "/servicos/planejamento-previdenciario" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
] as const;
```

O header (barra larga, pílula condensada e menu mobile) e o rodapé leem desta lista.

- [ ] **Step 2: Conferir o header**

Com o `dev` rodando, confira em 1280px, 1024px e na menor largura em que a navegação desktop aparece: a barra no topo, a pílula depois de rolar 80px (os cinco itens cabem sem quebrar linha nem encostar no monograma) e o menu mobile em 375px. Em `/blog`, o item "Blog" fica marcado como ativo. Se a pílula apertar, reduza o espaçamento entre itens no header antes de cogitar tirar algum item, e registre a decisão no commit.

- [ ] **Step 3: Check, build e commit**

Run: `npm run check && npm run build`
Expected: PASS.

```bash
git add src/lib/site.ts src/components/layout
git commit -m "Add the blog to the main navigation

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Segundo post de exemplo

**Files:**
- Create: `src/content/blog/bpc-loas-quem-tem-direito.md`
- Modify: `_docs/imagery.md`

- [ ] **Step 1: Escrever o post**

Cabeçalho:

```yaml
---
title: BPC/LOAS, quem tem direito ao benefício assistencial
description: O BPC paga um salário mínimo a idosos e pessoas com deficiência de baixa renda, sem exigir contribuição. Veja os requisitos e cuidados.
date: 2026-10-08
cover: /images/bpc.jpg
coverAlt: Mãos de pessoa idosa segurando documentos
coverSource: Shutterstock 2699270509
services: [bpc-loas, aposentadoria-pessoa-com-deficiencia, planejamento-previdenciario]
---
```

Corpo com as mesmas regras do post da Task 3 (600 a 900 palavras, `##`/`###`, só fatos já presentes na entrada `bpc-loas` de `src/content/services.ts`, fecho sem promessa). Ao contrário do primeiro, use um bloco de citação (`>`) para destacar o ponto de que o BPC não gera pensão nem 13º, para exercitar o estilo de `blockquote`. Confira o `alt` contra a foto real.

Na linha de `bpc.jpg` em `_docs/imagery.md`, acrescente "post BPC/LOAS" em "Onde aparece".

- [ ] **Step 2: Verificar e commit**

Run: `npm run check && npm run build`, e abra `/blog` (dois posts, mais recente primeiro; empate de data mantém a ordem estável) e o post novo no navegador.

```bash
git add src/content/blog _docs/imagery.md
git commit -m "Add the BPC/LOAS example post

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Guias técnicos e de design

**Files:**
- Create: `_docs/identidade-visual.md`, `_docs/componentes.md`, `_docs/seo.md`, `_docs/dev.md`

Estes guias são lidos pelo Claude do cliente. Escreva em português, frases diretas, com exemplos de código copiáveis. Antes de escrever cada um, leia os arquivos-fonte citados; nada de descrever de memória.

- [ ] **Step 1: `_docs/identidade-visual.md`**

Fonte: o `CLAUDE.md` atual (seções Paleta, Tipografia, Unidades, Cantos, Logo, Header, Animação), `src/app/globals.css` (tokens `--color-*`, classes `display-*`, `heading-*`, `body-*`, `label-mono`, `container-x`, `rounded-card`, `link-u`, variantes de botão, `data-theme="dark"`, `--accent`) e `README.md` (Referência visual). Seções obrigatórias:
1. Princípio em três frases (sóbrio, editorial, marinho e marfim, dourado pontual).
2. Paleta: tabela com token, hex, classe Tailwind, onde pode e onde não pode. Incluir "nada de preto puro" e "dourado só sobre fundo escuro; bronze é o dourado do fundo claro".
3. Tipografia: escala de classes com tamanho e uso; pesos 400/500/600; nunca itálico; `<em>` em títulos só troca a cor.
4. Grid e espaçamento: `container-x`, 12 colunas, gutter, padrões de padding de seção copiados das páginas existentes.
5. Unidades: a regra rem/em/px do `CLAUDE.md` atual, com o porquê (respeitar o tamanho de fonte do navegador).
6. Cantos, bordas e sombras.
7. Seções escuras: `data-theme="dark"`, botões `light` e `outline-light`, rótulos `text-paper/65`.
8. Logo e monograma: só via `Wordmark`/`Monogram`; nunca recriar com fonte.
9. Header e transições: comportamento e o que não mudar.
10. Movimento: `SplitReveal`, `ScrubText`, `Reveal`, `ClipReveal`, `Parallax`; sempre `gsap.matchMedia` e `prefers-reduced-motion`.
11. "Antes de inventar um estilo novo": procurar uma página que já resolve algo parecido e copiar o padrão.

- [ ] **Step 2: `_docs/componentes.md`**

Fonte: cada arquivo em `src/components/**` e `src/lib/{seo,schema,og,site}.ts`. Para cada componente: o que faz em uma linha, props principais, um exemplo de uso real (copiado de uma página que já o usa, com o caminho) e quando não usar. Agrupar em Layout (`PageTransition`, `PageHeader`, `Footer`, `Header`), Movimento, UI (`Button` e variantes, `Faq`, `ServiceCards`, `JsonLd`, formulários), Home (os da home, avisando que são específicos dela) e Helpers (`pageMetadata`, `pageGraph`, `renderOg`, `whatsappLink`, `site`). Fechar com "receitas": seção escura com CTA, lista numerada com 01/02, card de imagem 4/3, bloco de FAQ.

- [ ] **Step 3: `_docs/seo.md`**

Fonte: `src/lib/seo.ts`, `src/lib/schema.ts`, `src/lib/og.tsx`, `src/app/sitemap.ts`, as páginas de serviço e de blog. Cobrir: `pageMetadata` (por que nunca escrever `openGraph` à mão), título com 60 caracteres e o sufixo da marca, descrição até 155, `pageGraph` com breadcrumb e os tipos extras (`Service`, `FAQPage`, `BlogPosting`, `ItemList`), `opengraph-image.tsx` via `renderOg` (só JPEG), sitemap (onde acrescentar, `UPDATED`, posts automáticos), redirects 301 em `next.config.ts` quando uma URL mudar, um h1 por página, `alt` descritivo. Terminar com o checklist de SEO de página nova.

- [ ] **Step 4: `_docs/dev.md`**

Para desenvolvedores. Fonte: `README.md`, `AGENTS.md`, `next.config.ts`, `src/components/motion/*`, `src/lib/blog*.ts`, `src/app/contato/actions.ts`, `.env.example`. Cobrir: stack e versões; "este não é o Next que você conhece" e onde estão os docs locais; Cache Components (shell estático, `Suspense` para `params`, `readFileSync` no escopo do módulo no blog) e Partial Prefetching; transição de página (`PageTransition` em cada página, keyframes no fim do `globals.css`); Lenis e GSAP (`src/lib/gsap.ts`); formulário de contato e variáveis de ambiente; scripts (`dev`, `build`, `check`, `test`, `tag-image`); testes (`node --test`, por que `tests/` fica fora do `tsconfig`); como o blog funciona e o limite conhecido (`generateStaticParams` vazio se todos os posts forem apagados).

- [ ] **Step 5: Verificar e commit**

Run: `npm run check`
Expected: PASS (nenhum travessão ou emoji nos docs novos).

```bash
git add _docs
git commit -m "Add design, component, SEO and developer guides

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Guias de conteúdo, histórico e imagens

**Files:**
- Create: `_docs/conteudo-e-oab.md`, `_docs/historico.md`
- Modify: `_docs/imagery.md`

- [ ] **Step 1: `_docs/conteudo-e-oab.md`**

Seções:
1. Voz: direta, frases de tamanhos variados, concreto em vez de abstrato, explicar termo técnico na primeira vez (como "CNIS, o extrato do INSS" em `services.ts`).
2. Proibido em qualquer texto: travessão (descrever como "o traço longo"; nunca colar o caractere) e emoji. Alternativas: vírgula, dois-pontos, parênteses, ponto. Expressões de texto gerado a evitar: "não é só X, é Y", listas forçadas de três, "mergulhar", "robusto", "alavancar", "no mundo de hoje", "além disso" em excesso.
3. Publicidade da advocacia (Provimento 205/2021): sem promessa de resultado, sem preço ou honorários, sem comparação ("o melhor"), sem oferta gratuita como chamariz, sem depoimento de cliente, sem foto de cliente identificável. Atendimento: "presencial em Curitiba e online", nunca "100% online". Explicar que `npm run check` pega parte disso e onde editar a lista (`BANNED` em `scripts/check-content.mjs`).
4. Revisão jurídica: qualquer texto que cite idade, pontuação, prazo, valor ou percentual precisa da aprovação da Dra. Andressa antes de ir ao ar. Se o pedido vier de outra pessoa, o Claude avisa na prévia.
5. Anatomia de um post (cabeçalho com cada campo explicado, `##` e `###`, tamanho sugerido, fecho sem promessa) com os dois posts de exemplo como referência.
6. Manutenção anual: regra de pontos e idade progressiva (copiar do `post-launch-checklist.md`).

- [ ] **Step 2: `_docs/historico.md`**

Decisões e o porquê, para ninguém desfazer sem saber. Fonte: memória do projeto, `README.md`, `CLAUDE.md` atual e o log do git. Itens: referência visual (wolverineworldwide.com: grid, botões com seta, header-pílula, galeria, transições, rodapé com a marca gigante); Inter Tight no lugar da ABC Diatype (paga); pesos leves e nenhum itálico; paleta tirada dos posts do escritório; fotos nas cores originais e o motivo de duas licenciadas terem saído (P&B); rem para texto por causa do tamanho de fonte do navegador; formulário via Resend; redirects das URLs antigas do WordPress (e que o site antigo não tinha posts); blog em Markdown puro sem MDX; publicação sempre por prévia e PR; quem usa o projeto.

- [ ] **Step 3: Ampliar `_docs/imagery.md`**

Sem apagar nada do que existe, acrescentar no fim:

- **Imagens novas (posts e páginas)**: ordem de preferência (foto da cliente; Pexels ou Unsplash com licença que permite uso comercial sem atribuição; pedido específico). Nada de Shutterstock sem a conta do escritório. Nunca imagem gerada por IA representando pessoas reais ou cenas jurídicas.
- **Processo**, passo a passo, com comandos:
  1. Conferir a licença na página da foto.
  2. Pedir permissão à pessoa antes de baixar e dizer nome do arquivo e origem.
  3. Redimensionar: `ffmpeg -i original.jpg -vf "scale='min(2400,iw)':-2:flags=lanczos" -q:v 4 public/images/blog/<slug>.jpg`
  4. Gravar a origem: `npm run tag-image -- public/images/blog/<slug>.jpg "Pexels <id> (<url>), Pexels License. Resized."`
  5. Registrar numa tabela nova "Imagens do blog" (arquivo, onde aparece, origem, link).
  6. `npm run check`.
- **Foto enviada pela cliente**: mesmo processo, origem "Photo provided by the client".
- Manter "Critérios de escolha" como estão e acrescentar: sem marca d'água, sem texto na imagem, horizontal (a capa é 21/9 e a miniatura 4/3, então deixe o assunto no centro).

Crie a tabela "Imagens do blog" vazia com o cabeçalho, já que os dois posts de exemplo usam fotos registradas na tabela do Shutterstock.

- [ ] **Step 4: Verificar e commit**

Run: `npm run check`
Expected: PASS.

```bash
git add _docs
git commit -m "Add content, OAB and history guides, and the free image process

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Skills do projeto

**Files:**
- Create: `.claude/skills/publicar/SKILL.md`
- Create: `.claude/skills/revisar/SKILL.md`
- Create: `.claude/skills/novo-post/SKILL.md`
- Create: `.claude/skills/nova-pagina/SKILL.md`

**Interfaces:**
- Consumes: `npm run check|test|lint|build`, `npm run tag-image`, os guias das Tasks 6 e 7, o servidor `dev` do `.claude/launch.json`.

- [ ] **Step 1: `.claude/skills/revisar/SKILL.md`**

````markdown
---
name: revisar
description: Use antes de publicar qualquer mudança no site, ou quando a pessoa pedir para conferir, revisar ou ver se está tudo certo. Roda as checagens automáticas e percorre o checklist de marca, OAB e SEO.
---

# Revisar

Rode na ordem e só siga se cada passo passar.

1. `npm run check`. Se falhar, corrija cada item listado. Termo vetado: reescreva a frase, nunca edite a lista `BANNED` só para passar.
2. `npm test` e `npm run lint`.
3. `npm run build`. Se falhar, leia a mensagem inteira; erros de post vêm em português com o nome do arquivo.
4. Abra o site local (servidor `dev` do `.claude/launch.json`, porta 3100) no navegador do Claude e confira cada página que mudou.

## Checklist do que o script não pega

- [ ] Texto: voz direta, sem jargão sem explicação, sem promessa de resultado, sem comparação com outros escritórios. Cita idade, prazo, valor ou percentual? Então precisa da aprovação da Dra. Andressa (avise na hora da prévia).
- [ ] Um único h1. Títulos em `SplitReveal`, destaque em `<em>` só muda a cor.
- [ ] Cores da paleta (`_docs/identidade-visual.md`). Dourado só em fundo escuro; no claro, bronze. Nada de preto puro.
- [ ] Nada de itálico, nada de canto muito arredondado (cards 6px, botões 5px, miniaturas 4px).
- [ ] Imagem: adequada ao tema, cores originais, sem marca d'água, `alt` descreve o que aparece, registrada em `_docs/imagery.md`.
- [ ] Celular (375px): sem rolagem horizontal, textos legíveis, botões tocáveis.
- [ ] Com "reduzir movimento" (emular `prefers-reduced-motion: reduce`): página aparece completa, sem animação travada.
- [ ] Console do navegador sem erros. Links internos funcionando.
- [ ] Página nova: `pageMetadata`, `pageGraph`, `opengraph-image.tsx`, sitemap, `<PageTransition>` (ver `_docs/seo.md`).

Ao terminar, diga em uma ou duas frases o que conferiu e se encontrou algo.
````

- [ ] **Step 2: `.claude/skills/publicar/SKILL.md`**

````markdown
---
name: publicar
description: Use quando a pessoa pedir para colocar no ar, publicar, subir, atualizar o site, mandar para o site, ou disser que pode publicar. Leva a mudança de um branch até o site no ar, sempre com prévia e aprovação antes.
---

# Publicar

Quem pede normalmente não é técnico. Explique cada etapa em uma frase simples, sem jargão ("vou gerar uma prévia para você ver antes de ir ao ar"). Nunca pule a aprovação.

## 1. Preparar

- Confira o branch: `git branch --show-current`. Se for `main`, crie um: `git switch -c <tipo>/<descricao-curta>` (`post/`, `pagina/`, `ajuste/`).
- Rode a skill `revisar`. Não siga se algo falhar.

## 2. Enviar para a prévia

```bash
git add -A
git status --short
```

Confira a lista: só arquivos da mudança atual. Arquivo estranho (por exemplo `.env`, pastas de sistema) não entra; pergunte se não souber.

```bash
git commit -m "<o que mudou, em português, no imperativo>"
git push -u origin HEAD
```

Se ainda não existe pull request para o branch (`gh pr view --json url` falha), crie:

```bash
gh pr create --base main --title "<título curto>" --body "<o que mudou e por quê, em duas ou três linhas>"
```

## 3. Esperar e conferir a prévia

```bash
gh pr checks --watch
```

Quando a Vercel terminar, pegue o endereço da prévia:

```bash
gh api -X GET repos/{owner}/{repo}/deployments -f sha=$(git rev-parse HEAD) --jq '.[] | "\(.id) \(.environment)"'
gh api -X GET repos/{owner}/{repo}/deployments/<id>/statuses --jq '.[0] | "\(.state) \(.environment_url)"'
```

Use o `id` cujo ambiente não é `Production`. Se `gh pr checks` mostrar falha da Vercel, abra o link do check, leia o erro, corrija e volte ao passo 2. Se não conseguir resolver, explique em português simples e sugira chamar o desenvolvedor.

Abra a prévia no navegador do Claude e confira: a página que mudou, a home se menu ou rodapé mudaram, imagens carregando, console sem erros, largura de celular.

## 4. Pedir aprovação

Mande para a pessoa, nesta forma:

> Prévia pronta: <link da página na prévia>
> O que mudou: <duas ou três linhas>
> Posso publicar no site?

Se o texto cita idade, prazo, valor ou percentual, ou se quem pediu não é a Dra. Andressa, acrescente: "Como o texto trata de regras do INSS, a Dra. Andressa precisa aprovar antes."

Só siga com um "sim" claro. Qualquer outra resposta é ajuste: faça, volte ao passo 2 e mande a prévia nova.

## 5. Publicar

```bash
gh pr merge --squash --delete-branch
git switch main
git pull
```

Espere o deploy de produção:

```bash
gh api -X GET repos/{owner}/{repo}/deployments -f sha=$(git rev-parse HEAD) -f environment=Production --jq '.[0].id'
gh api -X GET repos/{owner}/{repo}/deployments/<id>/statuses --jq '.[0].state'
```

Repita a segunda consulta a cada 20 segundos até `success` (normalmente menos de 3 minutos). Se der `failure` ou `error`, vá para "Se algo der errado".

Abra a página no endereço real (o domínio está em `site.url`, `src/lib/site.ts`), confirme que a mudança aparece e avise: "Está no ar: <link>".

## Se algo der errado

- **Conflito com mudanças de outra pessoa:** `git pull --rebase origin main` no branch. Se o conflito não for claramente seu, pare e explique.
- **O site no ar quebrou depois de publicar:** explique o que aconteceu e ofereça voltar à versão anterior. Com o "sim", reverta pelo GitHub (`gh pr view <número> --json mergeCommit` e então `git revert <sha>` num branch novo, publicando por este mesmo fluxo) ou peça para a pessoa usar "Instant Rollback" no painel da Vercel.
- **Nunca:** `git push --force`, push direto no `main`, apagar branch de outra pessoa, `vercel --prod`.
````

- [ ] **Step 3: `.claude/skills/novo-post/SKILL.md`**

````markdown
---
name: novo-post
description: Use quando a pessoa pedir um post, artigo, texto para o blog, ou quiser escrever sobre algum tema (aposentadoria, INSS, benefício, revisão). Cria o post do blog do pedido até o arquivo pronto para a prévia.
---

# Novo post

1. Leia `_docs/conteudo-e-oab.md` e `_docs/imagery.md`. Abra os posts em `src/content/blog/` como modelo de estrutura e voz.
2. Se faltar, pergunte (uma pergunta por vez, em português simples): o tema; para quem é o texto; se há algo que a Dra. Andressa quer dizer; se há foto própria.
3. Crie o branch: `git switch -c post/<slug>`. O slug é o título em minúsculas, sem acento, com hífens.
4. Escreva `src/content/blog/<slug>.md` com o cabeçalho completo (todos os campos de `_docs/conteudo-e-oab.md`), `date` de hoje, `services` com dois ou três serviços de `src/content/services.ts` que tenham relação. Texto de 600 a 900 palavras, só `##` e `###`. Não invente regra, idade, prazo ou valor: se precisar de um dado legal, use o que está em `src/content/services.ts` ou pergunte. Feche convidando a conversar com o escritório, sem prometer resultado.
5. Imagem: siga o processo de `_docs/imagery.md` (pedir permissão antes de baixar; redimensionar; `npm run tag-image`; registrar na tabela "Imagens do blog").
6. Rode a skill `revisar`.
7. Mostre o resultado no site local e pergunte se quer ajustar algo ou colocar no ar. Para publicar, use a skill `publicar`.
````

- [ ] **Step 4: `.claude/skills/nova-pagina/SKILL.md`**

````markdown
---
name: nova-pagina
description: Use quando a pessoa pedir uma página nova no site (por exemplo uma página sobre um tema, uma landing page, uma página de serviço). Monta a página com todos os requisitos de design, SEO e transição.
---

# Nova página

1. Leia `_docs/identidade-visual.md`, `_docs/componentes.md` e `_docs/seo.md`.
2. **Serviço novo?** Então não crie página: acrescente uma entrada em `src/content/services.ts` copiando a forma de uma existente. A rota, o menu do rodapé, o sitemap e o OG saem sozinhos.
3. Crie o branch: `git switch -c pagina/<slug>`.
4. Escolha a página existente mais parecida e use como base. Monte `src/app/<slug>/page.tsx` com:
   - `export const metadata = pageMetadata({ title, description, path })`, descrição até 155 caracteres;
   - conteúdo dentro de `<PageTransition>`;
   - `<JsonLd data={pageGraph({ ..., trail: [{ name: "Início", path: "/" }, ...] })} />`;
   - `PageHeader` com o único h1;
   - componentes de `_docs/componentes.md` antes de criar qualquer novo.
5. Crie `src/app/<slug>/opengraph-image.tsx` com `renderOg` e uma foto JPEG registrada.
6. Acrescente o caminho ao array `pages` de `src/app/sitemap.ts`.
7. Se a página precisa aparecer no menu, pergunte antes: o menu tem espaço limitado (`mainNav` em `src/lib/site.ts`).
8. Rode a skill `revisar`, mostre no site local e, com o ok, use a skill `publicar`.

Se o pedido exigir um componente novo, mudança no header, nas transições, no `globals.css` ou em `src/lib/`, explique que é uma mudança estrutural e sugira envolver o desenvolvedor, a não ser que a pessoa queira seguir mesmo assim.
````

- [ ] **Step 5: Verificar e commit**

Run: `npm run check`
Expected: PASS (as skills entram na varredura de travessão e emoji).

Confirme que nenhuma skill cita usuário do GitHub, time da Vercel ou URL de repositório:

Run: `grep -rniE "flaviort|github\.com/|vercel\.com/[a-z]" .claude/skills`
Expected: nenhuma saída.

```bash
git add .claude/skills
git commit -m "Add publish, review, new post and new page skills

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Permissões do projeto

**Files:**
- Create: `.claude/settings.json`

- [ ] **Step 1: Escrever o arquivo**

```json
{
  "permissions": {
    "allow": [
      "Bash(git status *)",
      "Bash(git diff *)",
      "Bash(git log *)",
      "Bash(git fetch *)",
      "Bash(git pull *)",
      "Bash(git switch *)",
      "Bash(git branch --show-current)",
      "Bash(git branch -a)",
      "Bash(git rev-parse *)",
      "Bash(git add *)",
      "Bash(git commit *)",
      "Bash(git push -u origin *)",
      "Bash(git revert *)",
      "Bash(npm run check)",
      "Bash(npm run lint)",
      "Bash(npm run build)",
      "Bash(npm test)",
      "Bash(npm run tag-image *)",
      "Bash(npm install)",
      "Bash(npm ci)",
      "Bash(gh pr create *)",
      "Bash(gh pr view *)",
      "Bash(gh pr list *)",
      "Bash(gh pr checks *)",
      "Bash(gh api -X GET repos/*)",
      "Bash(vercel ls *)",
      "Bash(vercel inspect *)",
      "Bash(ffmpeg *)",
      "Bash(ffprobe *)"
    ],
    "ask": [
      "Bash(gh pr merge *)"
    ],
    "deny": [
      "Bash(git push --force*)",
      "Bash(git push -f*)",
      "Bash(git push * --force*)",
      "Bash(git push * -f*)",
      "Bash(git push origin main*)",
      "Bash(git push -u origin main*)",
      "Bash(git push origin HEAD:main*)",
      "Bash(git reset --hard*)",
      "Bash(git branch -D *)",
      "Bash(git clean *)",
      "Bash(rm -rf *)",
      "Bash(vercel --prod*)",
      "Bash(vercel deploy --prod*)",
      "Bash(vercel env rm *)",
      "Bash(vercel remove *)",
      "Bash(gh repo delete *)",
      "Bash(gh pr merge * --admin*)"
    ]
  }
}
```

Antes de salvar, confira o formato atual das regras na documentação do Claude Code (pergunte ao agente `claude-code-guide`: sintaxe de `permissions.allow/ask/deny` com curinga em `Bash(...)` e precedência de `deny` sobre `allow`). Ajuste a sintaxe se tiver mudado, mantendo as mesmas regras.

- [ ] **Step 2: Validar o JSON e commit**

Run: `node -e "JSON.parse(require('fs').readFileSync('.claude/settings.json','utf8')); console.log('ok')"`
Expected: `ok`

```bash
git add .claude/settings.json
git commit -m "Add project permissions for the publishing flow

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: Docs para pessoas, índice e transferência

**Files:**
- Create: `_docs/README.md`, `_docs/instalacao.md`, `_docs/como-pedir.md`
- Modify: `_docs/post-launch-checklist.md`
- Modify: `README.md`

- [ ] **Step 1: `_docs/instalacao.md`**

Roteiro para a call, para pessoa não técnica, Mac e Windows lado a lado onde diferir. Passos numerados, cada um com o que fazer, o que deve aparecer e o que fazer se não aparecer:
1. Instalar o app do Claude (desktop) e entrar com a conta do escritório; abrir a aba Code.
2. Instalar Node.js 24 LTS (nodejs.org) e conferir com `node -v`.
3. Instalar o Git e o GitHub CLI (`gh`); `gh auth login` com a conta do escritório.
4. Instalar o Vercel CLI (`npm i -g vercel`) e `vercel login`.
5. Clonar o repositório: `gh repo clone <dono>/<repositório>` (os nomes reais são passados na call; o doc não fixa nenhum) numa pasta fácil, como `Documentos/site`.
6. Abrir a pasta no Claude Code, rodar `npm install` e pedir "abre o site para eu ver".
7. Teste de ponta a ponta: pedir um post de rascunho, ver a prévia e responder "não publica, pode apagar".

- [ ] **Step 2: `_docs/como-pedir.md`**

Para a Andressa e o marido. Curto, em segunda pessoa, sem jargão:
- Como abrir o projeto no Claude e começar.
- Exemplos de pedidos que funcionam bem, agrupados: posts ("escreve um post sobre auxílio-acidente para quem sofreu acidente no trabalho"), ajustes de texto ("troca o telefone do rodapé"), imagens ("usa esta foto no post de BPC" anexando a foto), páginas ("cria uma página sobre o atendimento online"), publicação ("coloca no ar"), desfazer ("o que eu publiquei ontem ficou errado, volta como estava").
- O que esperar: o Claude mostra uma prévia e pergunta antes de publicar; responder "sim" publica.
- Quando chamar o desenvolvedor: mudança grande de layout, algo que o Claude disse que não conseguiu resolver, site fora do ar.
- O que nunca pedir: textos com promessa de resultado ou preço (regras da OAB), e por que o Claude vai recusar.

- [ ] **Step 3: `_docs/README.md`**

Índice: tabela com cada arquivo de `_docs/`, para quem é (cliente, Claude, desenvolvedor) e quando ler. Mais a lista das skills (`publicar`, `revisar`, `novo-post`, `nova-pagina`) com uma linha cada.

- [ ] **Step 4: Transferência no `_docs/post-launch-checklist.md`**

Acrescentar a seção "Transferência para o escritório", sem nomes de conta:
- GitHub: transferir o repositório para a conta do escritório ou adicioná-la como colaboradora com permissão de escrita; desenvolvedores mantêm acesso; ativar "Require a pull request before merging" no `main` (Settings, Branches) para reforçar o fluxo.
- Vercel: transferir o projeto ou recriar na conta do escritório ligado ao repositório; conferir que cada branch gera prévia; em Deployment Protection, desligar "Vercel Authentication" das prévias (senão a prévia pede login da Vercel no celular da cliente e no navegador do Claude) ou garantir que a cliente esteja logada; recriar `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_TO`, `GOOGLE_SITE_VERIFICATION`; mover o domínio.
- Shutterstock: as licenças continuam na conta de quem comprou; entregar os comprovantes (já listado em "Antes de publicar").
- Call: seguir `_docs/instalacao.md`, incluindo o teste de ponta a ponta.
- Revisão jurídica dos dois posts de exemplo, junto com a dos 12 serviços.

- [ ] **Step 5: `README.md`**

Atualizar: tirar a frase "Os formulários (pré-análise e contato) não têm backend" se estiver desatualizada (o contato usa Resend; confira `src/app/contato/actions.ts`), acrescentar o blog na tabela de estrutura, os scripts `check`, `test`, `tag-image`, e uma seção "Como trabalhar neste projeto" apontando para `_docs/README.md` e as skills. Corrigir "atendimento online" na primeira frase para "atendimento presencial e online".

- [ ] **Step 6: Verificar e commit**

Run: `npm run check && grep -rniE "flaviort|github\.com/[a-z]|vercel\.com/[a-z]" _docs README.md`
Expected: check PASS; o grep só pode mostrar URLs genéricas de documentação (como `vercel.com/docs`), nunca o dono do repositório ou do time.

```bash
git add _docs README.md
git commit -m "Add install guide, request examples and account transfer steps

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 11: CLAUDE.md curto

**Files:**
- Modify: `CLAUDE.md` (reescrever)

- [ ] **Step 1: Conferir que nada se perde**

Para cada regra do `CLAUDE.md` atual, aponte o arquivo de `_docs/` que agora a contém. Se alguma não tiver destino, acrescente ao guia certo antes de seguir.

- [ ] **Step 2: Reescrever**

```markdown
@AGENTS.md

# Andressa Ceccon Advocacia

Site da Dra. Andressa Ceccon (OAB/PR 74.854), advocacia previdenciária em Curitiba. Next 16, Tailwind 4, GSAP, Lenis.

## Quem usa este projeto

No dia a dia, a Dra. Andressa e o marido, sem conhecimento técnico. Fale em português simples, sem jargão. Antes de fazer algo, diga em uma frase o que vai acontecer. Mudanças grandes (layout, header, transições, `globals.css`, `src/lib/`) são para o desenvolvedor: avise e pergunte antes.

## Ao abrir uma sessão

1. `git fetch` e `git status`. Se o `main` remoto tiver novidades, atualize o `main` local antes de tudo.
2. Se houver branch não publicado ou mudanças não salvas de antes, conte em linguagem simples e pergunte se continua ou descarta. Nunca siga em cima disso sem perguntar.
3. Toda mudança acontece num branch (`post/`, `pagina/`, `ajuste/`), nunca no `main`.

## Regras que nunca mudam

- Texto sem travessão, sem emoji, com voz humana.
- Publicidade da advocacia (Provimento 205/2021): sem promessa de resultado, sem preço, sem "o melhor". Atendimento presencial em Curitiba e online, nunca "100% online".
- Texto com idade, prazo, valor ou percentual precisa da aprovação da Dra. Andressa.
- Publicar é sempre: `revisar`, prévia, "sim" da pessoa, PR, produção, conferir no ar (skill `publicar`).
- Nunca `--force`, nunca push no `main`, nunca apagar histórico.
- Antes de publicar: `npm run check` e `npm run build` passando.

## Onde está cada coisa

| Para | Leia |
| --- | --- |
| Escrever post ou texto | `_docs/conteudo-e-oab.md`, skill `novo-post` |
| Página nova | `_docs/componentes.md`, `_docs/seo.md`, skill `nova-pagina` |
| Cores, fontes, espaçamento, movimento | `_docs/identidade-visual.md` |
| Imagens | `_docs/imagery.md` |
| SEO e dados estruturados | `_docs/seo.md` |
| Por que algo é como é | `_docs/historico.md` |
| Detalhes técnicos | `_docs/dev.md` |
| Índice de tudo | `_docs/README.md` |

Dados de contato, endereço e OAB ficam em `src/lib/site.ts`; textos dos serviços em `src/content/services.ts`; posts em `src/content/blog/`. Não espalhe esses dados em componentes.
```

- [ ] **Step 3: Verificar e commit**

Run: `npm run check`
Expected: PASS.

```bash
git add CLAUDE.md
git commit -m "Rewrite CLAUDE.md as a short entry point for the client

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 12: Aceite

**Files:** nenhum novo, salvo correções.

- [ ] **Step 1: Check falha quando deve**

Crie `src/content/blog/teste-check.md` com travessão, "garantido" depois de "resultado" e `description` de 160 caracteres. Run: `npm run check`. Expected: FAIL listando os três. Apague o arquivo e rode de novo. Expected: PASS.

- [ ] **Step 2: Nenhum dono fixo**

Run (o grep do macOS não tem `-P`, por isso são dois):

```bash
grep -rniE "flaviort|github\.com/[a-z0-9-]+/" CLAUDE.md README.md _docs .claude
grep -rniE "vercel\.com/" CLAUDE.md README.md _docs .claude | grep -v "vercel\.com/docs"
```

Expected: nenhuma saída nos dois.

- [ ] **Step 3: Simulação com sessão sem contexto**

Despache um subagente `general-purpose` com `isolation: "worktree"` e este prompt: "Você é o Claude Code aberto neste projeto pela Dra. Andressa. Ela pediu: 'escreve um post sobre auxílio-acidente e coloca no ar'. Siga as instruções do projeto (CLAUDE.md, _docs, skills em .claude/skills) até o ponto de pedir aprovação da prévia, mas NÃO rode git push, gh pr create nem nenhum comando que saia da máquina: em vez disso, escreva os comandos que rodaria. Relate: quais arquivos leu, o branch criado, o post escrito, o resultado de npm run check e npm run build, e a mensagem exata que mandaria para ela." Avalie o relato contra o critério da spec: branch criado, regras seguidas, check e build passando, prévia antes de publicar, aviso de aprovação jurídica. Corrija skills ou docs onde o subagente se perdeu e repita até passar.

- [ ] **Step 4: Verificação final**

Run: `npm run check && npm test && npm run lint && npm run build`
Expected: tudo PASS. Abra `/blog`, os dois posts, `/servicos/bpc-loas` e a home no navegador, em desktop e 375px, e anexe os screenshots ao relatório.

- [ ] **Step 5: Commit das correções, se houver**

```bash
git add -A
git commit -m "Fix gaps found in the handoff dry run

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```
