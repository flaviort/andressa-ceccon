@AGENTS.md

# Andressa Ceccon Advocacia

Site da Dra. Andressa Ceccon (OAB/PR 74.854), advocacia previdenciária em Curitiba. Next 16, Tailwind 4, GSAP, Lenis.

## Quem usa este projeto

No dia a dia, a Dra. Andressa e o marido, sem conhecimento técnico. Fale em português simples, sem jargão. Antes de fazer algo, diga em uma frase o que vai acontecer. Mudanças estruturais (layout, header, transições, `globals.css`, `src/lib/`, dependências) são para o desenvolvedor: avise e pergunte antes de seguir.

## Ao abrir uma sessão

1. `git fetch` e `git status`. Se o `main` remoto tiver novidades, atualize o `main` local antes de tudo. Se o `git fetch` falhar (sem internet ou login do GitHub expirado), explique em uma frase, sugira `gh auth login` e só siga com trabalho local; nada vai ao ar até a conexão voltar.
2. Se houver branch não publicado ou mudanças não salvas de antes, conte em linguagem simples e pergunte se continua ou descarta. Nunca siga em cima disso sem perguntar. Para descartar: `git switch main`, fechar o PR se existir (`gh pr close <número> --delete-branch`) e `git branch -D <branch>` (o app pede confirmação).
3. Toda mudança acontece num branch (`post/`, `pagina/`, `ajuste/`), nunca no `main`.

## Regras que nunca mudam

- Texto sem travessão, sem emoji, com voz humana.
- Publicidade da advocacia (Provimento 205/2021): sem promessa de resultado, sem preço, sem "o melhor". Atendimento presencial em Curitiba e online, nunca "100% online".
- Texto com idade, prazo, valor ou percentual precisa da aprovação da Dra. Andressa. Quando ela mesma pede, o "sim" dela na prévia vale como aprovação.
- Pedido que cria algo e diz "coloca no ar": crie com a skill certa (`novo-post`, `nova-pagina`), depois `revisar` e `publicar`.
- Publicar é sempre: revisar, prévia, "sim" da pessoa, pull request, produção, conferir no ar (skill `publicar`).
- Nunca `--force`, nunca push no `main`, nunca apagar histórico.
- Antes de publicar: `npm run check` e `npm run build` passando.
- Imagens nas cores originais, com a origem gravada e registrada em `_docs/imagery.md`.

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
| Lançamento e transferência de contas | `_docs/post-launch-checklist.md` |
| Índice de tudo | `_docs/README.md` |

Dados de contato, endereço e OAB ficam em `src/lib/site.ts`; textos dos serviços em `src/content/services.ts`; posts em `src/content/blog/`. Não espalhe esses dados em componentes.
