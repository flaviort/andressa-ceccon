@AGENTS.md

# Andressa Ceccon Advocacia

Site institucional de advocacia previdenciária. Next 16 (Cache Components + Partial Prefetching), Tailwind 4, GSAP, Lenis, `<ViewTransition>`.

## Regras

- **Textos dos serviços** ficam em `src/content/services.ts`; contato, endereço e OAB em `src/lib/site.ts`. Não espalhar esses dados em componentes.
- **Metadados**: toda página usa `pageMetadata()` de `src/lib/seo.ts`. Nunca escrever `openGraph` à mão numa página (o Next substitui o objeto inteiro e perde campos). Descrições com até 155 caracteres.
- **JSON-LD**: o layout emite `siteGraph` (escritório, advogada, WebSite). Cada página emite `pageGraph()` com breadcrumb. Serviços adicionam `Service` e `FAQPage`.
- **Página nova**: `pageMetadata()`, `pageGraph()`, `opengraph-image.tsx` (via `renderOg`), entrada em `src/app/sitemap.ts` e envolver o conteúdo em `<PageTransition>`.
- **Um h1 por página.** Títulos animados usam `SplitReveal`; frases longas, `ScrubText`.
- **Paleta**: azul-marinho (`ink` #1b2848, `ink-deep` #121b33), dourado areia (`gold` #d4c09a, só sobre fundo escuro), bronze (`bronze` #7e6236, versão do dourado com contraste sobre fundo claro) e marfim (`paper` #f8f6f1). Nada de preto puro. O dourado/bronze é pontual: destaques `<em>` dos títulos, numeração de listas (01, 02) e o marcador da opção escolhida no formulário. Rótulos `label-mono` de seção usam `text-ash` no claro e `text-paper/65` no escuro. Botões sobre fundo escuro: `light` (marfim) e `outline-light` (vazado), nunca dourado.
- **Tipografia**: só Inter Tight (400/500/600), como a fonte grotesca da referência mas com pesos mais leves (títulos em 600, subtítulos em 500). Nunca usar itálico. Destaques em `<em>` dentro de títulos mudam só a cor (`--accent`: bronze no claro, dourado em `data-theme="dark"`). Rótulos em caixa alta espaçada (`label-mono`).
- **Cantos**: discretos. Cards e imagens 6px, botões 5px, miniaturas 4px. Nada de cantos muito arredondados.
- **Logo**: sempre o logotipo original do escritório (`_docs/brand/logo-original.svg`), sem o slogan, via `Wordmark` em `src/components/ui/logo.tsx`. O monograma "ac" (`Monogram`) usa as próprias letras do logotipo e aparece no header condensado, no favicon e no menu mobile. Não recriar o logo com fonte.
- **Header**: no topo é uma barra larga com o logotipo completo; ao rolar, vira uma pílula marinho centralizada e o logotipo recolhe até o monograma (como no site de referência). Nunca some ao rolar. No topo, a cor segue a seção abaixo; seções escuras levam `data-theme="dark"`.
- **Atendimento**: presencial em Curitiba e online. Nunca escrever "100% online".
- **Links para rotas com `params`** usam `prefetch` para a página chegar completa na transição.
- **Animação** sempre respeita `prefers-reduced-motion` (use `gsap.matchMedia`).
- **Texto**: sem travessão, sem emoji, voz humana. Publicidade da advocacia (Provimento 205/2021 da OAB): sem promessa de resultado, sem preço, sem "o melhor".
- **Imagens**: sempre nas cores originais, sem filtros, com a origem gravada no comentário do JPEG. Fotos de banco são licenciadas no Shutterstock; registre cada uma em `_docs/imagery.md`.

Checklist de lançamento: `_docs/post-launch-checklist.md`.
