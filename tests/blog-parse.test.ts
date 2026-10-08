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
