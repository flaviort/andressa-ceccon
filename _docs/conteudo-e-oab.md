# Conteúdo, voz e regras da OAB

Vale para tudo o que aparece no site: posts, páginas, serviços, botões, mensagens de erro. Também vale para os textos internos do projeto (docs, comentários, mensagens de commit).

## Voz

- Direta. Diga a coisa logo, sem frase de abertura que só anuncia o que vem depois.
- Linguagem de quem explica para um cliente na mesa do escritório, não de petição. Quando um termo técnico for necessário, explique na primeira vez: "o CNIS, o extrato do INSS".
- Concreta. Se a frase pede um número, uma idade ou um exemplo, use (desde que esteja certo; ver "Revisão jurídica").
- Frases de tamanhos variados. Texto com todas as frases do mesmo tamanho soa artificial.
- Segunda pessoa ("você") para falar com o leitor. O escritório fala de si na primeira pessoa do plural ("analisamos", "conferimos").

## Proibido em qualquer texto

- **Travessão** (o traço longo). Troque por vírgula, dois-pontos, parênteses ou ponto. O hífen comum (`-`) em palavras compostas, como "auxílio-doença", está certo.
- **Emoji.** Em nenhum lugar: texto, título, botão, lista.
- Fórmulas típicas de texto gerado por IA: "não é só X, é Y", listas de três itens só para fechar o ritmo, "mergulhar no assunto", "robusto", "alavancar", "no mundo de hoje", "além disso" e "ademais" encadeados, frase final que só resume o que já foi dito.

O `npm run check` acusa travessão e emoji automaticamente.

## Publicidade da advocacia (Provimento 205/2021 da OAB)

A propaganda de advogado tem regras próprias. No site:

- **Sem promessa de resultado.** Nada de "garantimos sua aposentadoria", "resultado garantido", "100% de êxito". O texto pode explicar o que o escritório faz, nunca o que vai conseguir.
- **Sem preço.** Nada de valor de honorários, "a partir de R$", "consulta gratuita", "análise grátis". Valores de benefício do INSS (por exemplo, "um salário mínimo") podem aparecer quando explicam a regra.
- **Sem comparação.** Nada de "o melhor escritório", "a melhor advogada", "o mais experiente".
- **Sem depoimento de cliente** e sem foto de cliente identificável.
- **Atendimento:** "presencial em Curitiba e online". Nunca "100% online".
- Tom informativo. Um post pode convidar a conversar com o escritório no fim, sem pressão e sem urgência artificial.

O `npm run check` pega parte disso. A lista de expressões vetadas é a constante `BANNED` no topo de `scripts/check-content.mjs`; acrescente casos novos ali quando aparecerem. Nunca remova um item da lista só para um texto passar: reescreva o texto.

## Revisão jurídica

Qualquer texto que cite **idade, pontuação, prazo, valor ou percentual** precisa da aprovação da Dra. Andressa antes de ir ao ar. A responsabilidade pelo conteúdo perante a OAB é dela.

- Não invente regra. Se o dado não está em `src/content/services.ts` nem foi passado por ela, pergunte.
- Se o pedido vier de outra pessoa (o marido, alguém do escritório), avise na hora da prévia que ela precisa aprovar.
- As regras mudam todo ano (veja "Manutenção anual"). Ao citar um número, diga a que ano ele se refere ("em 2026, 93 pontos").

## Anatomia de um post

Cada post é um arquivo em `src/content/blog/<slug>.md`. O slug é o título em minúsculas, sem acento, com hífens (`bpc-loas-quem-tem-direito`). Ele vira o endereço: `/blog/bpc-loas-quem-tem-direito`.

```yaml
---
title: BPC/LOAS, quem tem direito ao benefício assistencial
description: O BPC paga um salário mínimo a idosos e pessoas com deficiência de baixa renda, sem exigir contribuição. Veja os requisitos e cuidados.
date: 2026-10-08
updated: 2026-11-20
cover: /images/bpc.jpg
coverAlt: Retrato de uma senhora idosa em ambiente com pouca luz
coverSource: Shutterstock 2699270509
services: [bpc-loas, aposentadoria-pessoa-com-deficiencia]
---
```

| Campo | Obrigatório | O que é |
| --- | --- | --- |
| `title` | sim | Título do post. É o h1 da página e o título no Google. |
| `description` | sim | Resumo de até 155 caracteres. Aparece na listagem e no Google. |
| `date` | sim | Data de publicação, `AAAA-MM-DD`. |
| `updated` | não | Data da última revisão. Use quando corrigir ou atualizar o conteúdo. |
| `cover` | sim | Foto de capa, um `.jpg` em `public/images/` (posts novos usam `public/images/blog/`). |
| `coverAlt` | sim | Descrição do que aparece na foto. |
| `coverSource` | sim | Origem da foto (ex.: `Pexels 1234567`, `Foto da cliente`). |
| `services` | não | Slugs de `src/content/services.ts` que aparecem como cards no fim. Dois ou três. |

O texto vem depois do cabeçalho, em Markdown:

- Intertítulos com `##` e subdivisões com `###`. **Nunca `#` sozinho**: o título já é o h1.
- Listas com `-` ou numeradas com `1.` (saem numeradas 01, 02 em bronze).
- Destaque com `**negrito**`. Citação com `>` no começo da linha.
- Entre 600 e 900 palavras é um bom tamanho.
- Feche com um parágrafo curto convidando a conversar com o escritório, presencialmente em Curitiba ou online, sem prometer resultado.

O site já acrescenta no fim de cada post a autoria, o aviso "Este texto é informativo e não substitui a análise do seu caso" e os cards dos serviços.

Os dois posts de exemplo (`regras-de-transicao-da-aposentadoria.md` e `bpc-loas-quem-tem-direito.md`) são o modelo de estrutura e de voz.

## Manutenção anual

Todo começo de ano:

- Atualizar a regra de pontos e a idade mínima progressiva em `aposentadoria-por-tempo-de-contribuicao` (`src/content/services.ts`) e no post de regras de transição (com `updated` novo).
- Revisar posts que citam números do ano anterior.
- Atualizar `UPDATED` em `src/app/sitemap.ts`.
