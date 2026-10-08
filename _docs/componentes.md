# Componentes e helpers

O que já existe no site e quando usar. Antes de criar um componente novo, procure aqui. Se uma página já resolve algo parecido, abra o arquivo dela e copie o padrão.

## Layout

### `PageTransition` (`src/components/motion/page-transition.tsx`)

Envolve **todo** o conteúdo de cada página. Faz a transição de "folha" entre páginas e coloca o rodapé. Fica na página, não no layout, porque o layout não é recriado na navegação.

```tsx
export default function MinhaPagina() {
  return <PageTransition>{/* conteúdo */}</PageTransition>;
}
```

`footer={false}` tira o rodapé (raro).

### `PageHeader` (`src/components/ui/page-header.tsx`)

Topo padrão das páginas internas: trilha de navegação, o **único h1** da página (com `SplitReveal`) e uma linha de apoio.

```tsx
<PageHeader
  crumbs={[{ label: "Início", href: "/" }, { label: "Serviços" }]}
  title="Serviços previdenciários"
  lead="Do planejamento antes da aposentadoria à revisão de um benefício já concedido..."
/>
```

- `wide`: deixa o título ocupar mais largura (títulos longos, como os do blog).
- `children`: conteúdo extra no grid abaixo do lead (o blog usa para autoria e data).

### `Header` e `Footer` (`src/components/layout/`)

Já estão no layout e no `PageTransition`. Os links vêm de `mainNav` em `src/lib/site.ts` e da lista de serviços. Mudanças aqui são estruturais: fale com o desenvolvedor.

## Movimento (`src/components/motion/`)

| Componente | O que faz | Exemplo real |
| --- | --- | --- |
| `SplitReveal` | Título entra linha por linha. `as` define a tag (`h2` por padrão), `trigger="load"` anima na carga em vez de na rolagem. | `src/app/sobre/page.tsx`, títulos de seção |
| `ScrubText` | Frase longa que se preenche com a rolagem. `tone="light"` no escuro. | Intro da home e da página Sobre |
| `Reveal` | Filhos diretos aparecem em sequência. `as="ul"` para listas, `stagger` controla o intervalo. | Lista de `/servicos` e de `/blog` |
| `ClipReveal` | Imagem abre de baixo para cima. | Capa dos serviços e dos posts |
| `Parallax` | Imagem se move contra a rolagem. `amount` em %. Envolva uma imagem com `fill`. | `PushCta`, foto da página Sobre |

Todos respeitam "reduzir movimento". Não anime com CSS ou GSAP solto sem `gsap.matchMedia`.

## Interface (`src/components/ui/`)

### `Button`

Link com aparência de botão e a troca de setas no hover. Links internos recebem `prefetch` sozinhos; links que começam com `http` abrem em nova aba.

```tsx
<Button href="/contato" variant="outline">Fale conosco</Button>
<Button href={site.clientArea} variant="outline" icon="↗">Área do cliente</Button>
```

Variantes: `default`, `dark`, `outline` no claro; `light`, `outline-light` no escuro; `glass` sobre foto. **Não use `gold`.**

### `Faq`

Acordeão de perguntas e respostas. As respostas ficam no HTML (bom para busca).

```tsx
<Faq items={[{ q: "Pergunta?", a: "Resposta." }]} />
```

Se usar numa página nova, acrescente também o `FAQPage` no `pageGraph` (ver `_docs/seo.md`).

### `ServiceCards`

Três cards de serviços com foto, número em bronze, título e resumo. Usado no fim das páginas de serviço e dos posts.

```tsx
<ServiceCards items={["bpc-loas", "pensao-por-morte"].map(getService).filter((s) => s !== undefined)} />
```

### `JsonLd`

Imprime dados estruturados. Sempre com o resultado de `pageGraph()`.

### Formulários

`ContactForm` (envia por e-mail via Resend) e `PreAnaliseForm` (envia por e-mail via Resend e oferece o WhatsApp em seguida). São específicos das páginas `/contato` e `/pre-analise`. Mexer neles é mudança estrutural.

### Logo

`Wordmark` (logotipo completo), `Monogram` ("ac") e `Logo` (o do header). Ver `_docs/identidade-visual.md`.

## Componentes da home (`src/components/home/`)

`Hero`, `HeroVideo`, `ImageGalaxy`, `ServicesCarousel` e `Counter` foram feitos para a home e não são pensados para reuso.

A exceção é **`PushCta`**: a seção escura de tela cheia com foto, título e dois botões que fecha quase todas as páginas. Pode e deve ser usada em páginas novas.

```tsx
<PushCta />
<PushCta title={["Vamos olhar", "o seu caso?"]} image="/images/idade.jpg" />
```

A última linha do `title` sai destacada em dourado. O texto padrão fala da pré-análise; troque com `text` se a página pedir outro convite, sem prometer resultado.

## Helpers (`src/lib/`)

| Helper | Arquivo | Para quê |
| --- | --- | --- |
| `pageMetadata()` | `seo.ts` | Título, descrição, canonical, Open Graph e Twitter de cada página. |
| `pageGraph()` | `schema.ts` | Dados estruturados da página com trilha de navegação. |
| `renderOg()` | `og.tsx` | Imagem de compartilhamento 1200x630 com a foto da página. |
| `site` | `site.ts` | Nome, OAB, telefone, endereço, redes, domínio. |
| `whatsappLink(msg)` | `site.ts` | Link do WhatsApp com mensagem pronta. |
| `mainNav` | `site.ts` | Itens do menu. |
| `services`, `getService(slug)` | `src/content/services.ts` | Os 12 serviços. |
| `posts`, `getPost(slug)` | `blog.ts` | Os posts do blog. |
| `formatDate(iso)` | `blog-parse.ts` | "8 de outubro de 2026". |

Dados de contato, endereço e OAB vêm sempre de `site`. Nunca escreva o telefone ou o endereço direto num componente.

## Receitas

### Seção em duas colunas (título pequeno + frase grande)

Padrão da home e da página Sobre:

```tsx
<section className="container-x grid grid-cols-12 gap-x-[var(--grid-gutter)] gap-y-8 py-24 md:py-40">
  <SplitReveal as="h2" className="heading-xs col-span-12 md:col-span-4">
    O escritório
  </SplitReveal>
  <div className="col-span-12 md:col-span-7 md:col-start-6">
    <ScrubText className="heading-sm">Frase longa que se preenche com a rolagem.</ScrubText>
  </div>
</section>
```

### Seção escura

```tsx
<section data-theme="dark" className="bg-ink py-24 text-paper md:py-36">
  <div className="container-x">
    <p className="label-mono text-paper/65">Rótulo</p>
    <SplitReveal as="h2" className="heading-lg mt-6">
      Título com <em>destaque</em>
    </SplitReveal>
    <Button href="/contato" variant="light" className="mt-8">Fale conosco</Button>
  </div>
</section>
```

### Lista numerada 01, 02

```tsx
<span className="label-mono text-bronze">01</span>
```

No escuro, `text-gold`. Em texto Markdown (posts), a lista numerada (`1.`) já sai assim.

### Imagem em card

```tsx
<div className="relative aspect-[4/3] overflow-hidden rounded-card bg-fog">
  <Image src="/images/x.jpg" alt="Descrição do que aparece" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
</div>
```

### Texto longo

Envolva em `.prose-legal` numa coluna de leitura:

```tsx
<article className="prose-legal col-span-12 md:col-span-8 md:col-start-3 lg:col-span-7 lg:col-start-4">
  <h2>Intertítulo</h2>
  <p>Parágrafo.</p>
</article>
```
