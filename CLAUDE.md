@AGENTS.md

# Andressa Ceccon Advocacia

Site institucional de advocacia previdenciária. Next 16 (Cache Components + Partial Prefetching), Tailwind 4, GSAP, Lenis, `<ViewTransition>`.

## Regras

- **Textos dos serviços** ficam em `src/content/services.ts`; contato, endereço e OAB em `src/lib/site.ts`. Não espalhar esses dados em componentes.
- **Metadados**: toda página usa `pageMetadata()` de `src/lib/seo.ts`. Nunca escrever `openGraph` à mão numa página (o Next substitui o objeto inteiro e perde campos). Descrições com até 155 caracteres.
- **JSON-LD**: o layout emite `siteGraph` (escritório, advogada, WebSite). Cada página emite `pageGraph()` com breadcrumb. Serviços adicionam `Service` e `FAQPage`.
- **Página nova**: `pageMetadata()`, `pageGraph()`, `opengraph-image.tsx` (via `renderOg`), entrada em `src/app/sitemap.ts` e envolver o conteúdo em `<PageTransition>`.
- **Um h1 por página.** Títulos animados usam `SplitReveal`; frases longas, `ScrubText`.
- **Header**: a cor segue a seção abaixo dele. Seções escuras levam `data-theme="dark"`.
- **Links para rotas com `params`** usam `prefetch` para a página chegar completa na transição.
- **Animação** sempre respeita `prefers-reduced-motion` (use `gsap.matchMedia`).
- **Texto**: sem travessão, sem emoji, voz humana. Publicidade da advocacia (Provimento 205/2021 da OAB): sem promessa de resultado, sem preço, sem "o melhor".
- **Imagens**: todas em P&B (`hue=s=0`), com a origem gravada no comentário do JPEG. Fotos de banco são licenciadas no Shutterstock; registre cada uma em `_docs/imagery.md`.

Checklist de lançamento: `_docs/post-launch-checklist.md`.
