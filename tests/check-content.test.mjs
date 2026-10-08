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
