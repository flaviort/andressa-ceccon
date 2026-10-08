---
name: publicar
description: Use quando a pessoa pedir para colocar no ar, publicar, subir, atualizar o site, mandar para o site, ou disser que pode publicar. Leva a mudança de um branch até o site no ar, sempre com prévia e aprovação antes.
---

# Publicar

Quem pede normalmente não é técnico. Explique cada etapa em uma frase simples, sem jargão ("vou gerar uma prévia para você ver antes de ir ao ar"). Nunca pule a aprovação.

## 1. Preparar

- Se a mudança pedida ainda não foi feita (por exemplo "escreve um post sobre X e coloca no ar"), faça primeiro com a skill certa (`novo-post`, `nova-pagina`) e volte aqui.
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

Se a prévia pedir login da Vercel, é a proteção de prévias do projeto: peça para a pessoa abrir o link no navegador em que ela está logada, ou sugira desligar a proteção (ver `_docs/post-launch-checklist.md`). Abra a prévia no navegador do Claude e confira: a página que mudou, a home se menu ou rodapé mudaram, imagens carregando, console sem erros, largura de celular.

## 4. Pedir aprovação

Mande para a pessoa, nesta forma:

> Prévia pronta: <link da página na prévia>
> O que mudou: <duas ou três linhas>
> Posso publicar no site?

Se o texto cita idade, prazo, valor ou percentual:
- quem pediu é a Dra. Andressa: diga quais números o texto cita ("o texto cita o prazo de 15 dias e a carência de 12 meses; confira antes de aprovar"). O "sim" dela vale como aprovação jurídica;
- quem pediu é outra pessoa: acrescente "Como o texto trata de regras do INSS, a Dra. Andressa precisa aprovar antes" e só publique com o ok dela.

Se ficou algum dado de fora por não estar no site, ou se a capa é provisória, diga isso na mesma mensagem.

Só siga com um "sim" claro. Qualquer outra resposta é ajuste: faça, volte ao passo 2 e mande a prévia nova.

Se a pessoa desistir ("não publica", "pode descartar"), feche sem publicar:

```bash
git switch main
gh pr close <número> --delete-branch
```

Confirme que o `main` local não mudou (`git status`) e avise que nada foi ao ar.

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

- **Conflito com mudanças de outra pessoa:** no branch, `git fetch` e `git merge origin/main` (nunca rebase: o branch já foi enviado e reescrever o histórico exigiria `--force`). Se o conflito não for claramente seu, pare e explique.
- **O site no ar quebrou depois de publicar:** explique o que aconteceu e ofereça voltar à versão anterior. Com o "sim", reverta pelo GitHub (`gh pr view <número> --json mergeCommit` e então `git revert <sha>` num branch novo, publicando por este mesmo fluxo) ou peça para a pessoa usar "Instant Rollback" no painel da Vercel.
- **Nunca:** `git push --force`, push direto no `main`, apagar branch de outra pessoa, `vercel --prod`.
