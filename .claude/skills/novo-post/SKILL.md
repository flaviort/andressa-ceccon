---
name: novo-post
description: Use quando a pessoa pedir um post, artigo, texto para o blog, ou quiser escrever sobre algum tema (aposentadoria, INSS, benefício, revisão). Cria o post do blog do pedido até o arquivo pronto para a prévia.
---

# Novo post

1. Leia `_docs/conteudo-e-oab.md` e `_docs/imagery.md`. Abra os posts em `src/content/blog/` como modelo de estrutura e voz.
2. Se faltar, pergunte (uma pergunta por vez, em português simples): o tema; para quem é o texto; se há algo que a Dra. Andressa quer dizer; se há foto própria.
3. Crie o branch: `git switch -c post/<slug>`. O slug é o título em minúsculas, sem acento, com hífens.
4. Escreva `src/content/blog/<slug>.md` com o cabeçalho completo (todos os campos de `_docs/conteudo-e-oab.md`), `date` de hoje, `services` com dois ou três serviços de `src/content/services.ts` que tenham relação. Texto de 600 a 900 palavras, só `##` e `###`. Não invente regra, idade, prazo ou valor: se precisar de um dado legal, use o que está em `src/content/services.ts` ou pergunte. Feche convidando a conversar com o escritório, sem prometer resultado.
5. Imagem: siga o processo de `_docs/imagery.md` (pedir permissão antes de baixar; redimensionar; `npm run tag-image`; registrar na tabela "Imagens do blog").
6. Rode a skill `revisar`.
7. Mostre o resultado no site local e pergunte se quer ajustar algo ou colocar no ar. Para publicar, use a skill `publicar`.
