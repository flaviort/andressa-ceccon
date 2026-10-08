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
