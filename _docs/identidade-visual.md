# Identidade visual

O site é sóbrio e editorial: muito marfim, texto em azul-marinho, títulos grandes com pesos leves e fotos nas cores originais. O dourado aparece pouco e sempre com função. Se uma mudança deixa a página mais colorida, mais arredondada ou mais "enfeitada", provavelmente está saindo da identidade.

Antes de inventar um estilo, procure uma página do site que já resolve algo parecido e copie o padrão dela.

## Paleta

As cores estão definidas no `@theme` de `src/app/globals.css` e viram classes do Tailwind (`bg-ink`, `text-ash`, `border-ink/10`).

| Token | Hex | Uso |
| --- | --- | --- |
| `ink` | `#1b2848` | Azul-marinho. Texto principal no claro e fundo das seções escuras. |
| `ink-deep` | `#121b33` | Marinho mais fundo, para camadas sobre o `ink` e o fundo da transição de página. |
| `paper` | `#f8f6f1` | Marfim. Fundo padrão do site e texto sobre fundo escuro. |
| `fog` | `#efebe3` | Fundo de blocos de destaque no claro (ex.: "Documentos" nos serviços). |
| `mist` | `#e4ded2` | Variação mais escura do `fog`. |
| `ash` | `#5f6677` | Texto secundário, legendas, rótulos no claro. |
| `smoke` | `#bdb5a5` | Detalhes discretos. |
| `gold` | `#d4c09a` | Dourado areia. **Só sobre fundo escuro.** |
| `bronze` | `#7e6236` | O dourado do fundo claro: mesma família, com contraste suficiente sobre o marfim. |

Regras:

- Nada de preto puro (`#000`, `text-black`, `bg-black`). O escuro do site é sempre o `ink`.
- O dourado e o bronze são pontuais. Aparecem em três lugares: o destaque `<em>` dentro de títulos, a numeração de listas (01, 02) e o marcador da opção escolhida no formulário de pré-análise. Não use dourado em fundos, botões ou blocos inteiros.
- Bordas e divisórias usam o próprio `ink` com transparência: `border-ink/10` no claro, `border-white/10` no escuro.

## Tipografia

Uma família só: **Inter Tight**, nos pesos 400, 500 e 600. Títulos em 600, subtítulos em 500, texto corrido em 400. **Nunca itálico.**

Use as classes da escala em vez de tamanhos avulsos (`text-[...]`):

| Classe | Peso | Uso |
| --- | --- | --- |
| `display-xl` | 600 | Título do hero da home. |
| `display-lg` | 600 | h1 das páginas internas (já vem pronto no `PageHeader`). |
| `heading-lg` | 600 | Títulos de seção grandes. |
| `heading-md` | 600 | Títulos de seção (ex.: "Perguntas frequentes"). |
| `heading-sm` | 500 | Subtítulos, títulos de itens de lista, frases de destaque. |
| `heading-xs` | 500 | Linhas de apoio, o "lead" do `PageHeader`. |
| `body-lg` | 400 | Parágrafos de abertura. |
| `body-md` | 400 | Texto comum. |
| `body-sm` | 400 | Legendas, descrições de cards, links pequenos. |
| `label-mono` | 500 | Rótulo em caixa alta espaçada ("NESTA PÁGINA", datas do blog). |

Os tamanhos usam `clamp()` e crescem com a tela. Texto longo (posts, seções dos serviços) fica dentro de `.prose-legal`, que já cuida de intertítulos, listas, citações e links.

### Destaque dentro de títulos

Um `<em>` dentro de h1, h2, h3, p ou span **só muda a cor**, sem itálico. No claro fica bronze, numa seção com `data-theme="dark"` fica dourado. Exemplo real em `src/app/not-found.tsx`:

```tsx
Página <em>não encontrada.</em>
```

### Rótulos

`label-mono` usa `text-ash` no claro e `text-paper/65` no escuro.

## Grid e espaçamento

- Todo bloco de conteúdo começa com `container-x`, que aplica a margem lateral do grid (16px no celular, 32px a partir de 768px, 48px a partir de 1200px).
- Dentro dele, o grid é de 12 colunas: `grid grid-cols-12 gap-x-[var(--grid-gutter)]`. O gutter é 12px no celular e 20px a partir de 768px.
- Espaçamento vertical das seções segue o que já existe: `pb-24 md:pb-40` para o fim de listas, `py-20 md:py-32` para blocos de texto, `pb-24 md:pb-36` para seções secundárias.
- Texto de leitura fica numa coluna de 7 ou 8 colunas, não na largura toda (ver `src/app/blog/[slug]/page.tsx`).

## Unidades

- **rem** para texto e para tudo que acompanha o texto: altura e padding de botões e campos, a pílula do header. Assim o site respeita o tamanho de fonte que a pessoa escolheu no navegador.
- **em** para o deslocamento das setas dos botões, que acompanha o tamanho do rótulo.
- **px** para bordas, cantos, sombras, margens do grid e o logotipo.
- Media queries em rem, como os breakpoints do Tailwind (`md` = 48rem, `lg` = 64rem).

## Cantos, bordas e sombras

Discretos. Cards e imagens 6px (`rounded-card`), botões 5px (`rounded-btn`), miniaturas 4px (`rounded-[4px]`). Nada de `rounded-xl`, `rounded-full` em cards ou cantos muito arredondados. Sombras quase não aparecem; prefira borda fina ou mudança de fundo.

## Seções escuras

Uma seção escura leva `data-theme="dark"`, fundo `bg-ink` e texto `text-paper`:

```tsx
<section data-theme="dark" className="bg-ink py-24 text-paper md:py-36">
```

Isso troca o `--accent` para dourado e faz o header, quando está no topo, usar a cor clara. Botões sobre fundo escuro usam `variant="light"` (marfim) ou `variant="outline-light"` (vazado). **Nunca** `variant="gold"`, mesmo existindo no código.

## Botões

`Button` de `src/components/ui/button.tsx`. Variantes: `default` (marinho translúcido, para o claro), `dark` (marinho cheio), `outline` (vazado no claro), `light` e `outline-light` (no escuro), `glass` (sobre foto). No hover, a seta da direita sai e uma entra pela esquerda; não troque esse comportamento.

## Logo

Sempre o logotipo original do escritório, sem o slogan (`_docs/brand/logo-original.svg`), através dos componentes de `src/components/ui/logo.tsx`:

- `Wordmark`: o logotipo completo.
- `Monogram`: o "ac" feito com as letras do próprio logotipo. Aparece no header condensado, no favicon e no menu mobile.

Nunca recrie o logo digitando o nome com uma fonte.

## Header

No topo da página é uma barra larga com o logotipo completo. Ao rolar, vira uma pílula marinho centralizada e o logotipo recolhe até o monograma. Nunca some ao rolar. No topo, a cor do header segue a seção logo abaixo (por isso seções escuras precisam do `data-theme="dark"`).

A navegação completa aparece a partir de 1024px. Abaixo disso, o botão "Menu" abre o menu de tela cheia. O menu tem espaço limitado: antes de acrescentar um item em `mainNav` (`src/lib/site.ts`), confira a pílula em 1024px.

## Movimento

Os componentes ficam em `src/components/motion/`:

- `SplitReveal`: títulos que entram linha por linha. Use em títulos animados.
- `ScrubText`: frases longas cujas palavras se preenchem conforme a rolagem.
- `Reveal`: filhos diretos aparecem em sequência ao entrar na tela.
- `ClipReveal`: imagem que abre de baixo para cima.
- `Parallax`: imagem que se move contra a rolagem.

Toda animação nova usa `gsap.matchMedia` e respeita `prefers-reduced-motion`: com "reduzir movimento" ligado, o conteúdo aparece pronto, sem animação. A transição entre páginas (`PageTransition`) já faz isso.

## Imagens

Sempre nas cores originais, sem filtros, sem preto e branco. Regras de escolha e o processo completo em `_docs/imagery.md`.
