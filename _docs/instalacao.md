# Instalação

Roteiro para deixar o computador pronto para editar o site com o Claude. Feito uma vez, na call de entrega, com o desenvolvedor junto. Leva cerca de 40 minutos.

Cada passo diz o que fazer, o que deve aparecer e o que fazer se não aparecer. Onde Mac e Windows diferem, os dois estão indicados.

Para os comandos, use o **Terminal** (Mac: procure "Terminal" no Spotlight) ou o **PowerShell** (Windows: procure "PowerShell" no menu Iniciar).

## 1. App do Claude

1. Baixe o app do Claude em claude.ai/download e instale.
2. Entre com a conta do escritório.
3. Abra a aba **Code**.

Deve aparecer: a tela do Claude Code pedindo para escolher uma pasta. Ainda não escolha nada.

## 2. Node.js

O site precisa do Node.js para rodar no computador.

1. Em nodejs.org, baixe a versão **LTS** (24 ou mais recente) e instale com as opções padrão.
2. Feche e abra o Terminal de novo e digite:

   ```bash
   node -v
   ```

Deve aparecer: algo como `v24.x.x`. Se aparecer "comando não encontrado", reinicie o computador e tente de novo.

## 3. Git e GitHub

O GitHub guarda o código do site e o histórico de todas as mudanças.

1. Instale o Git:
   - Mac: digite `git --version` no Terminal. Se ainda não estiver instalado, o Mac oferece instalar; aceite.
   - Windows: baixe em git-scm.com e instale com as opções padrão.
2. Instale o GitHub CLI:
   - Mac: em cli.github.com, baixe o instalador para macOS.
   - Windows: em cli.github.com, baixe o instalador para Windows.
3. Entre com a conta do escritório:

   ```bash
   gh auth login
   ```

   Escolha `GitHub.com`, `HTTPS`, confirme que quer autenticar o Git e siga pelo navegador.

Deve aparecer: `Logged in as <usuário do escritório>`.

## 4. Vercel

A Vercel é onde o site fica hospedado. O Claude usa para conferir a prévia e a publicação.

```bash
npm i -g vercel
vercel login
```

Entre com a conta do escritório pelo navegador. No Mac, se o primeiro comando reclamar de permissão, o desenvolvedor resolve na call.

## 5. ffmpeg (para redimensionar fotos)

O Claude usa o ffmpeg para preparar as fotos dos posts.

- Mac: com o Homebrew (brew.sh), `brew install ffmpeg`. Se o Homebrew não estiver instalado, o desenvolvedor instala na call.
- Windows: `winget install ffmpeg`.

Deve aparecer, ao digitar `ffmpeg -version`: uma linha começando com `ffmpeg version`.

## 6. Baixar o site

Escolha uma pasta fácil de achar, como `Documentos`, e baixe o projeto. O desenvolvedor passa o nome exato do repositório na call:

```bash
cd ~/Documents
gh repo clone <dono>/<repositório> site-andressa
```

Deve aparecer: uma pasta `site-andressa` dentro de `Documentos`.

## 7. Abrir no Claude

1. No app do Claude, aba **Code**, escolha a pasta `site-andressa`.
2. Peça: **"instala o que precisa e abre o site para eu ver"**.

O Claude roda a instalação e abre o site no navegador dele. Pode pedir permissão para alguns comandos na primeira vez; pode aceitar.

## 8. Teste de ponta a ponta

Ainda na call, faça um teste completo sem publicar nada:

1. Peça: **"escreve um post curto de teste sobre auxílio-acidente e coloca no ar"**.
2. O Claude escreve o post, gera uma prévia e manda o link perguntando se pode publicar.
3. Abra o link e veja como ficou.
4. Responda: **"não publica, era só um teste, pode apagar"**.

Se tudo isso funcionou, o computador está pronto. O próximo passo é ler `_docs/como-pedir.md`.
