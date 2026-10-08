---
name: novo-post
description: Use quando a pessoa pedir um post, artigo, texto para o blog, ou quiser escrever sobre algum tema (aposentadoria, INSS, benefício, revisão), inclusive quando o pedido já termina em "coloca no ar". Cria o post do blog do pedido até a prévia.
---

# Novo post

Se o pedido também diz "coloca no ar" ou "publica", siga esta skill até o fim e depois a `publicar`. A aprovação acontece na prévia; não pare antes para pedir licença.

1. Leia `_docs/conteudo-e-oab.md` e `_docs/imagery.md`. Abra os posts em `src/content/blog/` como modelo de estrutura e voz.
2. Só pergunte o que não dá para deduzir. Se o tema veio no pedido, comece a escrever. Valores padrão quando ninguém disser nada:
   - público: segurados do INSS em geral, sem conhecimento jurídico;
   - foto: capa provisória (passo 5);
   - tom: o dos posts de exemplo.
3. Crie o branch: `git switch -c post/<slug>`. O slug é curto (3 a 6 palavras), derivado do título, em minúsculas, sem acento, com hífens. Ex.: `bpc-loas-quem-tem-direito`.
4. Escreva `src/content/blog/<slug>.md` com o cabeçalho completo (campos em `_docs/conteudo-e-oab.md`) e `date` de hoje.
   - `services`: o serviço do próprio tema em `src/content/services.ts`, mais um ou dois da lista `related` dele.
   - Texto de 600 a 900 palavras, só `##` e `###`. Feche convidando a conversar com o escritório, presencialmente em Curitiba ou online, sem prometer resultado.
   - **Dados jurídicos:** use só o que está em `src/content/services.ts` ou o que a pessoa passou. Se o tema pede um dado que não está lá (valor, prazo, quem tem direito), não invente: escreva o post sem ele e liste o que ficou de fora na mensagem da prévia, perguntando se ela quer incluir e qual regra usar. Se o que existe não rende um post de pelo menos 500 palavras, pergunte antes de escrever.
5. **Capa:** cada post tem foto própria, diferente das fotos das páginas de serviço. Se a pessoa mandou uma foto, use essa, seguindo o processo de `_docs/imagery.md`. Se não, procure duas ou três opções num banco gratuito, mostre e peça permissão para baixar a escolhida (ver `_docs/imagery.md`). Só use uma foto já registrada em `public/images/` como capa provisória se a pessoa não puder escolher agora, e diga isso na mensagem da prévia.
6. Rode a skill `revisar`.
7. Se a pessoa pediu para publicar, siga a skill `publicar`. Se não, mostre o resultado e pergunte se quer ajustar algo ou colocar no ar.
