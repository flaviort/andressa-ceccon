# Kit de entrega para o cliente usar com o Claude

Data: 8 de outubro de 2026

## Objetivo

Entregar o site pronto junto com um conjunto de instruções para o Claude Code que permita à Dra. Andressa e ao marido criar posts, páginas e ajustes sozinhos, sem perder a identidade visual, as regras de publicidade da OAB e o padrão de SEO, e publicando com segurança.

## Quem usa

- **Uso diário:** a Dra. Andressa e o marido. Conhecimento técnico básico. Fazem pedidos em linguagem natural ("cria um post sobre revisão da vida toda e coloca no ar"). Podem pedir qualquer mudança, não só posts.
- **Uso ocasional:** os desenvolvedores atuais, que continuam com acesso ao repositório para mudanças maiores.
- **Ambiente:** Claude Code no app desktop, com o projeto clonado no computador deles (a confirmar na call de instalação). Plano Pro (a confirmar).

## Princípios

1. **As instruções são para o Claude, não para pessoas.** O Claude precisa saber executar o fluxo inteiro e saber quando parar e perguntar. Os docs para humanos se limitam à instalação e a exemplos de pedidos.
2. **Nada aponta para um dono específico.** Nenhum usuário do GitHub, time da Vercel ou URL de repositório escrito nos docs. O Claude descobre na hora (`git remote`, `gh repo view`, `.vercel/project.json`). O único endereço fixo é o domínio público, que já está em `src/lib/site.ts`. Assim o kit funciona se o repositório for transferido ou se a conta do cliente for adicionada ao repositório atual.
3. **Um fluxo seguro para qualquer mudança.** Toda mudança, de um post a uma cor, passa por `revisar` e `publicar`. As skills de criação são atalhos, não portões.
4. **O que dá para checar com script, é checado com script.** Regras mecânicas (travessão, emoji, termos vetados, limites de SEO) não dependem da memória do Claude.
5. **Tudo o que hoje vive fora do repositório entra nele.** As regras de escrita do `~/.claude/CLAUDE.md` global do desenvolvedor e o histórico de decisões da memória local passam a morar em `_docs/`.

## Estrutura de arquivos

```
CLAUDE.md                  curto: quem usa, regras inegociáveis, início de sessão, mapa dos docs
AGENTS.md                  mantém como está (gerado pelo next dev)
.claude/
  settings.json            permissões: libera a rotina, bloqueia o perigoso
  launch.json              mantém (servidores dev e prod)
  skills/
    publicar/SKILL.md      prévia, aprovação, produção, conferência
    novo-post/SKILL.md     post do blog do pedido até o arquivo pronto
    nova-pagina/SKILL.md   página institucional nova com todos os requisitos
    revisar/SKILL.md       checklist de marca, OAB e SEO antes de publicar
_docs/
  README.md                índice: o que tem aqui e quando ler cada um
  instalacao.md            roteiro da call: Node, git, gh, Vercel CLI, abrir no Claude
  como-pedir.md            para a cliente: exemplos de pedidos em português simples
  identidade-visual.md     paleta, tipografia, unidades, cantos, logo, header, movimento
  componentes.md           o que já existe, quando usar, exemplos de uso
  conteudo-e-oab.md        voz, sem travessão e emoji, Provimento 205/2021, revisão jurídica
  seo.md                   pageMetadata, pageGraph, OG, sitemap, limites
  imagery.md               já existe; ganha bancos gratuitos, critérios e processo
  historico.md             decisões e o porquê
  dev.md                   para desenvolvedores: arquitetura, Cache Components, transições
  post-launch-checklist.md já existe; ganha os passos da transferência de contas
scripts/check-content.mjs  checagem automática, exposta como npm run check
```

### CLAUDE.md

Passa a ter só:

- Quem usa o projeto e como falar com essas pessoas (português simples, sem jargão, explicar o que vai acontecer antes de fazer).
- Regras inegociáveis em poucas linhas: sem travessão, sem emoji, voz humana; Provimento 205/2021; atendimento presencial em Curitiba e online, nunca "100% online"; nunca trabalhar no `main`; nunca `--force`; sempre `npm run check` e `npm run build` antes de publicar.
- O ritual de início de sessão (ver Fluxo).
- Mapa: qual doc ler para cada tipo de tarefa e quais skills existem.

As regras detalhadas de design que estão hoje no `CLAUDE.md` migram para `identidade-visual.md`, `componentes.md` e `seo.md`, sem perda de conteúdo.

### Skills

Cada skill tem descrição que dispara por pedido em linguagem natural, em português ("coloca no ar", "publica", "sobe isso"; "escreve um post", "artigo sobre"; "cria uma página"; "confere se está tudo certo").

- **publicar**: executa o fluxo de publicação descrito abaixo. Inclui o caminho de volta (Instant Rollback da Vercel ou revert do PR), sempre perguntando antes.
- **novo-post**: lê `conteudo-e-oab.md` e `imagery.md`, olha os posts existentes como modelo, pergunta o que faltar (tema, público, se há foto própria), escreve o arquivo, escolhe ou recebe a imagem, roda o check e oferece a prévia.
- **nova-pagina**: lê `identidade-visual.md`, `componentes.md` e `seo.md`, monta a página com `pageMetadata()`, `pageGraph()`, `opengraph-image.tsx` via `renderOg`, entrada no sitemap, `<PageTransition>`, um h1, e reaproveita componentes existentes antes de criar novos.
- **revisar**: roda `npm run check` e `npm run build`, abre a página no navegador local e percorre um checklist do que o script não pega (tom, adequação da foto, hierarquia, contraste do dourado, mobile, reduzir movimento).

### settings.json

- **Liberado sem pedir:** `git status/diff/log/fetch/pull/switch/checkout -b/add/commit/push` de branch que não seja `main`, `npm run dev/build/check/lint`, `gh pr create/view/checks/merge`, `gh run view`, `vercel ls/inspect`, `ffmpeg`, leitura de arquivos.
- **Bloqueado:** `git push --force` e variantes, `git push` para `main`, `git reset --hard`, `git branch -D`, `git clean`, `rm -rf`, `vercel --prod`, `vercel env rm`.
- O merge no `main` acontece por `gh pr merge`, que é liberado mas só é chamado pela skill `publicar` depois do "sim" explícito.

## Fluxo de trabalho

### Início de sessão

1. `git fetch`. Se o `main` remoto tiver commits novos, atualiza o `main` local antes de qualquer coisa.
2. Se houver branch local não publicado ou mudanças não salvas de uma sessão anterior, avisa em linguagem simples e pergunta se continua ou descarta. Nunca segue em cima disso sem perguntar.

### Durante o trabalho

3. Cria um branch com nome legível: `post/<slug>`, `pagina/<slug>`, `ajuste/<descricao-curta>`.
4. Faz a mudança seguindo os docs, roda `npm run check` e `npm run build` e confere no site local.

### Publicação (skill publicar)

5. Commit com mensagem clara em português, push do branch.
6. Espera a Vercel gerar a prévia do branch (`gh pr checks` ou `vercel ls`), abre a URL, confere a página mexida (e a home, se menu ou rodapé mudaram), console e imagens.
7. Manda para o cliente: o link da prévia, o que mudou em duas ou três linhas e a pergunta "posso publicar?". Se o conteúdo cita prazos, idades ou valores, ou se o pedido veio do marido, lembra que a Dra. Andressa precisa aprovar o texto.
8. Com o "sim": abre (ou reaproveita) o pull request, faz o merge, espera o deploy de produção, confere a página no domínio real e avisa que está no ar com o link.

### Quando algo dá errado

9. Build falhou, conflito ou deploy com erro: o Claude resolve o que for claramente dele. Se não resolver, para, explica em português simples e sugere chamar o desenvolvedor. Nunca força, nunca apaga histórico.
10. Site no ar quebrou após publicar: oferece Instant Rollback na Vercel ou revert do PR, e só executa depois de perguntar.

Como tudo entra por PR, os desenvolvedores podem ativar notificações no GitHub e acompanhar o que é publicado.

## Blog

- **Conteúdo:** um arquivo por post em `src/content/blog/<slug>.md`, com frontmatter e corpo em Markdown puro (sem MDX).

  ```yaml
  title: Título do post
  description: Até 155 caracteres.
  date: 2026-10-08
  updated: 2026-10-08
  cover: /images/blog/<slug>.jpg
  coverAlt: Descrição da imagem
  coverSource: Pexels 1234567
  services: [bpc-loas, revisao-de-beneficios]
  ```

- **Leitura dos arquivos:** um módulo `src/lib/blog.ts` lê e valida o frontmatter no build e converte o Markdown em HTML com uma biblioteca pequena e mantida (escolha na fase de plano, conferindo a compatibilidade com Next 16).
- **Rotas:** `/blog` (listagem, mais recentes primeiro) e `/blog/[slug]`, geradas estaticamente com `generateStaticParams`. Links para posts usam `prefetch`.
- **SEO:** `pageMetadata()`; `pageGraph()` com breadcrumb e `Article` cuja autora é a Dra. Andressa, ligada ao `@id` que o layout já emite; `opengraph-image.tsx` via `renderOg` com a capa; entrada automática no sitemap usando `updated`.
- **Layout do post:** título com `SplitReveal`, capa, corpo com um estilo de artigo próprio (largura de leitura, intertítulos, listas, citações) usando a escala `heading-*`/`body-*`, autoria e data, cards dos serviços relacionados e o CTA de contato. Tudo dentro de `<PageTransition>`.
- **Navegação:** "Blog" entra no menu e no rodapé.
- **Exemplos:** dois posts reais, um sobre regras de transição e outro sobre BPC/LOAS, que servem de modelo de estrutura e voz. Ficam na lista de revisão jurídica do checklist de lançamento.

### Imagens dos posts

Ordem de preferência: foto enviada pelo cliente; foto de banco gratuito com licença que permite uso comercial sem atribuição (Pexels, Unsplash); pedido específico do cliente. O Claude redimensiona com ffmpeg, grava a origem no comentário do JPEG e registra em `_docs/imagery.md`. Os critérios já existentes continuam valendo: cores originais, sem P&B, sem martelo de juiz, sem sorriso posado, mãos ou figuras de costas em temas sensíveis.

## Checagem automática

`scripts/check-content.mjs`, sem dependências, exposto como `npm run check`. Falha com mensagem em português indicando arquivo e linha. Verifica:

- travessão (`—`) e emoji em `src/content/`, textos de `src/app/` e `src/components/`, e `_docs/`;
- termos vetados de uma lista editável no topo do script: "o melhor", "garantido", "garantimos", "100% online", "resultado certo", e menções a preço ou honorários;
- `description` acima de 155 caracteres e `title` ausente em posts e serviços;
- arquivo em `public/images/` sem linha correspondente em `_docs/imagery.md`;
- post com serviço relacionado que não existe em `src/content/services.ts`.

O script é uma rede, não um juiz. O que exige julgamento fica no checklist da skill `revisar`.

## Transferência de contas

Entra em `post-launch-checklist.md`:

- GitHub: transferir o repositório para a conta do cliente ou adicioná-la como colaboradora; os desenvolvedores continuam com acesso.
- Vercel: transferir o projeto ou recriar na conta do cliente ligado ao repositório; conferir previews por branch ativos; recriar as variáveis de ambiente (`RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_TO`, `GOOGLE_SITE_VERIFICATION`); domínio.
- Na call: instalação seguindo `instalacao.md`, login no `gh` e na Vercel CLI, e um teste de ponta a ponta com um post de rascunho que não é publicado.

## Fora do escopo

- CI no GitHub Actions (o build da Vercel já barra deploy quebrado).
- CMS visual ou painel de edição.
- Uso pelo Claude Code na nuvem como caminho principal (pode ser documentado depois, se a call mudar a premissa).

## Como saber que deu certo

- Numa sessão nova, sem contexto, o pedido "escreve um post sobre auxílio-acidente e coloca no ar" leva o Claude a criar o branch, escrever o post dentro das regras, passar no check e no build, gerar a prévia e perguntar antes de publicar.
- `npm run check` passa no estado atual do site e falha num arquivo de teste com travessão, "garantido" e descrição longa.
- Nenhum arquivo do kit contém usuário do GitHub, time da Vercel ou URL de repositório.
