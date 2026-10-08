# SEO e dados estruturados

O site foi feito para aparecer bem nas buscas por advocacia previdenciária. Cada página nova precisa seguir o mesmo padrão; o checklist no fim resume tudo.

## Título e descrição: `pageMetadata()`

Toda página define os metadados com `pageMetadata()` de `src/lib/seo.ts`:

```tsx
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Atendimento online",
  description: "Como funciona o atendimento online do escritório: envio de documentos, reuniões por vídeo e acompanhamento do pedido ao INSS.",
  path: "/atendimento-online",
});
```

- **Nunca escreva `openGraph` à mão** numa página. O Next substitui o objeto inteiro e a página perde os campos que o helper preenche (canonical, imagem, nome do site).
- O título ganha o sufixo " | Andressa Ceccon" automaticamente, desde que o total caiba em 60 caracteres. Se passar, o sufixo sai sozinho.
- **Descrição com até 155 caracteres.** Uma frase ou duas, dizendo o que a pessoa encontra na página. O `npm run check` confere isso nos serviços e nos posts.
- `keywords` é opcional. Os serviços usam; o blog não precisa.
- Posts usam a opção `article` (data de publicação e de atualização), que a página do blog já passa.

Para páginas com `params` (como `/servicos/[slug]`), use `generateMetadata` chamando o mesmo `pageMetadata()`.

## Dados estruturados: `pageGraph()`

O layout já imprime os dados do escritório, da advogada e do site (`siteGraph` em `src/lib/schema.ts`). Cada página acrescenta os seus com `pageGraph()` e o componente `JsonLd`:

```tsx
<JsonLd
  data={pageGraph({
    path: "/atendimento-online",
    name: "Atendimento online",
    description: "...",
    trail: [
      { name: "Início", path: "/" },
      { name: "Atendimento online", path: "/atendimento-online" },
    ],
  })}
/>
```

- `trail` vira a trilha de navegação que o Google mostra no resultado. Sempre começa em "Início".
- `type` muda o tipo da página: `WebPage` (padrão), `AboutPage`, `ContactPage`, `CollectionPage` (listagens).
- `extra` recebe blocos adicionais. Os que o site já usa:
  - `Service`: páginas de serviço (`src/app/servicos/[slug]/page.tsx`).
  - `FAQPage`: qualquer página com perguntas frequentes. As perguntas do JSON-LD precisam ser as mesmas que aparecem na tela.
  - `BlogPosting`: posts, com a Dra. Andressa como autora (`ids.lawyer`).
  - `ItemList`: listagens (`/servicos`, `/blog`).

## Imagem de compartilhamento: `opengraph-image.tsx`

É a imagem que aparece quando alguém compartilha o link no WhatsApp, Facebook ou LinkedIn. Cada rota tem o seu arquivo, e todos usam `renderOg()` de `src/lib/og.tsx`:

```tsx
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Atendimento online da Andressa Ceccon Advocacia";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: "Atendimento online", label: "O escritório", photo: "/images/calculos.jpg" });
}
```

A foto precisa ser **JPEG** e estar registrada em `_docs/imagery.md`. `position` ajusta o recorte (ex.: `"center 18%"` para um rosto).

## Sitemap

`src/app/sitemap.ts` lista as páginas para o Google:

- Página nova: acrescente o caminho ao array `pages`.
- Serviços e posts entram sozinhos.
- `UPDATED` é a data de atualização das páginas fixas. Mude quando alterar o conteúdo delas. Os posts usam o campo `updated` de cada um.

## URLs que mudam

Se uma página mudar de endereço ou for apagada, crie um redirecionamento 301 em `redirects()` no `next.config.ts`, apontando para a página mais parecida. As URLs antigas do WordPress já estão lá.

## Boas práticas de página

- **Um único h1 por página** (o `PageHeader` já cria). Seções usam h2; subseções, h3.
- Todo `alt` de imagem descreve o que aparece na foto. Imagem decorativa (fundo, efeito) usa `alt=""`.
- Links internos com texto que diz para onde vão ("Veja a aposentadoria especial", e não "clique aqui").
- Texto do serviço ou do post responde à pergunta que a pessoa digitou no Google, em linguagem simples.

## Checklist de página nova

- [ ] `pageMetadata()` com título e descrição de até 155 caracteres
- [ ] `JsonLd` com `pageGraph()` e trilha a partir de "Início"
- [ ] `opengraph-image.tsx` com `renderOg()` e foto JPEG registrada
- [ ] Caminho no array `pages` de `src/app/sitemap.ts`
- [ ] Conteúdo dentro de `<PageTransition>`
- [ ] Um h1 só
- [ ] Links para rotas com parâmetro (`/servicos/...`, `/blog/...`) com `prefetch`
- [ ] `npm run check` e `npm run build` passando
