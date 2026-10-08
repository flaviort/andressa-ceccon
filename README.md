# Andressa Ceccon Advocacia

Site institucional da Dra. Andressa Ceccon (OAB/PR 74.854), advocacia previdenciária em Curitiba com atendimento online.

Next.js 16 (App Router, Cache Components), Tailwind CSS 4, GSAP 3 (ScrollTrigger, SplitText), Lenis e a View Transitions API via `<ViewTransition>` do React 19.3.

```bash
npm install
npm run dev
```

## Estrutura

| Caminho | O que tem |
| --- | --- |
| `src/content/services.ts` | Os 12 serviços: textos, SEO, FAQ, documentos, relacionados. Fonte única das páginas `/servicos/[slug]`, do menu, do rodapé e do sitemap. |
| `src/lib/site.ts` | Telefone, endereço, redes, OAB e o helper de link do WhatsApp. |
| `src/lib/seo.ts` | `pageMetadata()`: canonical, Open Graph e Twitter de cada página. |
| `src/lib/schema.ts` | JSON-LD ligado por `@id`: escritório, advogada e WebSite no layout; `pageGraph()` por página com breadcrumb, `Service` e `FAQPage`. |
| `src/lib/og.tsx` | Imagem de compartilhamento 1200x630 de cada rota, com a foto da página. |
| `src/components/motion/` | Lenis, transição de página, revelação de títulos por linha, preenchimento de texto no scroll, parallax. |
| `src/app/globals.css` | Tokens de design (escala tipográfica, grid, botões) e as animações da transição de página. |

## Referência visual

Estrutura e movimento baseados em wolverineworldwide.com: grid de 12 colunas com margem de 48px e gutter de 20px, botões com troca de seta no hover, header que vira pílula ao rolar, galeria flutuante, transições de página e o rodapé com a marca gigante.

Cores seguem os posts do escritório (azul-marinho, dourado areia e marfim). Tipografia em Inter Tight com pesos leves, sem itálico; fotos nas cores originais.

## Transição de página

Cada `page.tsx` é envolvido por `PageTransition`, que usa `<ViewTransition enter="page-enter" exit="page-exit">`. A página antiga encolhe e escurece enquanto a nova sobe como uma folha. O header tem `view-transition-name` próprio e fica parado. Os keyframes estão no fim de `globals.css`. Com `prefers-reduced-motion` tudo fica instantâneo.

Os formulários (pré-análise e contato) não têm backend: montam a mensagem e abrem o WhatsApp.

## Pendências antes de publicar

A lista completa, incluindo domínio, Search Console e testes, está em `_docs/post-launch-checklist.md`. As regras do projeto estão em `CLAUDE.md`.


- **Fotos de banco**: 15 imagens licenciadas no Shutterstock. Lista, IDs e como reprocessar em `_docs/imagery.md`.
- **Foto da advogada**: `public/images/andressa.jpg` (760x1024, enviada pelo cliente). Por ser estreita, aparece em coluna, não em largura total.
- **Vídeo do hero**: Pexels, licença gratuita (vídeo 8061372, advogada assinando documentos no escritório).
- **Revisão jurídica**: os textos dos serviços citam requisitos legais (idades, pontos de 2026, prazos). Precisam da revisão da Dra. Andressa e de atualização anual da regra de pontos e da idade progressiva.
- **Publicidade na advocacia**: o texto evita promessa de resultado e menção a preço, seguindo o Provimento 205/2021 da OAB. Vale manter esse cuidado em qualquer alteração.
