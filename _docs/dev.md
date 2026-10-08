# Notas para desenvolvedores

Para quem vai mexer na estrutura do site. O dia a dia (posts, ajustes de texto, páginas simples) está coberto pelas skills em `.claude/skills/` e pelos outros guias.

## Stack

- Next.js 16.4 com App Router, **Cache Components** e **Partial Prefetching** (`next.config.ts`)
- React 19.3, com `<ViewTransition>` para a transição de página
- Tailwind CSS 4 (tokens no `@theme` de `src/app/globals.css`, utilitários com `@utility`)
- GSAP 3 (ScrollTrigger, SplitText) via `src/lib/gsap.ts`, e Lenis para a rolagem suave
- Resend para os formulários de contato e de pré-análise
- `marked` e `yaml` para o blog

**Este não é o Next que você conhece.** A versão 16 mudou APIs e convenções. Antes de escrever código que use uma API do Next, leia o guia correspondente em `node_modules/next/dist/docs/` (é a regra do `AGENTS.md`).

## Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento (o `.claude/launch.json` usa a porta 3100) |
| `npm run build` | Build de produção |
| `npm start` | Serve o build (porta 3200 no `launch.json`) |
| `npm run lint` | ESLint |
| `npm run check` | Regras de marca, OAB e SEO (`scripts/check-content.mjs`) |
| `npm test` | Testes com `node:test` |
| `npm run tag-image -- <arquivo> "<origem>"` | Grava a origem da foto no comentário do JPEG |

Os testes ficam em `tests/` e importam `.ts` com extensão, que o Node 22.18+ executa direto. Por isso `tests/` está no `exclude` do `tsconfig.json`: o `tsc` do Next recusaria esses imports.

## Cache Components

Com Cache Components, o build gera um shell estático de cada rota e só o que depende da requisição fica para depois:

- Páginas com `params` (serviços, posts) põem o conteúdo dentro de `<Suspense>`, com o `<PageTransition>` fora, no shell. Os links para essas páginas usam `prefetch`, então o conteúdo já chega pronto quando a transição começa.
- O blog lê os arquivos com `readFileSync` **no escopo do módulo** (`src/lib/blog.ts`). Leitura síncrona de arquivo é tratada como previsível e entra no shell estático. Um `await readFile()` dentro do componente seria tratado como dado não cacheado.
- `outputFileTracingIncludes` no `next.config.ts` garante que os `.md` dos posts vão junto na função da Vercel, caso alguma rota do blog seja renderizada em tempo de requisição.

## Transição de página

Cada `page.tsx` envolve o conteúdo em `PageTransition`, que usa `<ViewTransition enter="page-enter" exit="page-exit">`. A página antiga encolhe e escurece enquanto a nova sobe como uma folha. O header tem `view-transition-name` próprio e fica parado. Os keyframes estão no fim do `globals.css`. Com `prefers-reduced-motion`, tudo fica instantâneo. `SheetTransition` trata o caso do iOS.

O `PageTransition` fica na página, e não no layout, porque o layout persiste entre navegações e nunca dispararia `enter` ou `exit`.

## Animação

- Registre plugins só em `src/lib/gsap.ts`.
- Use `useGSAP` e `gsap.matchMedia` com `(prefers-reduced-motion: no-preference)` em toda animação nova.
- A rolagem é do Lenis (`SmoothScroll`). Para saber a posição, use `useLenis()`; `window.scrollTo` sozinho não move o Lenis.

## Blog

- Posts em `src/content/blog/<slug>.md`, com cabeçalho YAML. Os campos estão em `_docs/conteudo-e-oab.md`.
- `src/lib/blog-parse.ts` é puro (sem `@/`, sem `fs`) para poder ser testado com `node --test`. Valida o cabeçalho e converte o Markdown. Um post inválido derruba o build com a mensagem em português.
- `src/lib/blog.ts` lê a pasta e ordena do mais recente para o mais antigo.
- Limite conhecido: se todos os posts forem apagados, `generateStaticParams` volta vazio. A listagem mostra "Nenhum post publicado ainda", mas confira o build nesse cenário antes de esvaziar a pasta.

## Formulários

- **Contato** (`src/app/contato/actions.ts`): Server Action que envia por e-mail com o Resend. Sem `RESEND_API_KEY`, em desenvolvimento a mensagem só aparece no terminal; em produção mostra erro e sugere o WhatsApp. Variáveis em `.env.example`.
- **Pré-análise** (`src/app/pre-analise/actions.ts`, perguntas em `src/content/pre-analise.ts`): Server Action que envia as respostas por e-mail com o Resend e depois oferece o botão do WhatsApp com as mesmas respostas. Se o e-mail falhar, o botão do WhatsApp aparece junto com o erro.
- O envio pelo Resend dos dois formulários fica em `src/lib/mail.ts`.

## Variáveis de ambiente

Ver `.env.example`: `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_TO`, `GOOGLE_SITE_VERIFICATION`. Ficam no painel da Vercel; nunca no repositório.

## Segurança

Headers em `next.config.ts`. A CSP estrita ficou de fora de propósito: os scripts inline do Next e os blocos de JSON-LD exigiriam nonce, o que tornaria todas as páginas dinâmicas.

## Fluxo de publicação

Mesmo para desenvolvedores, o caminho é o da skill `publicar`: branch, PR, prévia da Vercel, merge. Assim o histórico fica num lugar só para quem acompanha o projeto.
