# Imagens

As fotos são usadas nas cores originais. As de banco foram licenciadas no Shutterstock (Licença Padrão, plano Plus de equipe) em 8 de outubro de 2026, redimensionadas com ffmpeg. Cada arquivo traz a origem gravada no comentário do JPEG.

Os originais em alta resolução ficam fora do repositório (baixados como `shutterstock_<id>.jpg`). Para reprocessar:

```bash
ffmpeg -i shutterstock_<id>.jpg -vf "scale='min(2400,iw)':-2:flags=lanczos" -q:v 4 public/images/<slot>.jpg
```

## Licenças Shutterstock

| Arquivo | Onde aparece | ID Shutterstock |
| --- | --- | --- |
| `planejamento.jpg` | Planejamento previdenciário, card de destaque da home | 2706461347 |
| `idade.jpg` | Aposentadoria por idade, galáxia, CTA da página Sobre, OG de /servicos | 2699568907 |
| `transicao.jpg` | Regras de transição, OG de /contato | 2633039561 |
| `especial.jpg` | Aposentadoria especial, galáxia | 2758900805 |
| `rural.jpg` | Aposentadoria rural, galáxia | 2710106783 |
| `pcd.jpg` | Pessoa com deficiência, galáxia | 2727319989 |
| `pensao.jpg` | Pensão por morte, galáxia | 2738114549 |
| `bpc.jpg` | BPC/LOAS, galáxia | 2699270509 |
| `incapacidade.jpg` | Benefícios por incapacidade, galáxia | 2762332177 |
| `maternidade.jpg` | Salário-maternidade, galáxia | 2688637561 |
| `revisao.jpg` | Revisão de benefícios | 2738502725 |
| `calculos.jpg` | Cálculos previdenciários, OG de /blog | 2763305203 |
| `maos.jpg` | OG de /pre-analise | 2741819071 |
| `cta.jpg` | CTA final em tela cheia | 2581692597 |
| `gestante.jpg` | Galáxia | 2678349491 |

Página de cada imagem: `https://www.shutterstock.com/image-photo/-<ID>`. O histórico de licenças fica na conta Shutterstock (Minha conta, Histórico de downloads).

## Outras

- `andressa.jpg`: foto enviada pela cliente (recorte da direita, blazer branco), 760x1024.
- `public/video/balanca-justica.mp4` e `.webm` (pôster `.jpg`): Pexels, vídeo 5637303 (balança da Justiça sobre a mesa de um advogado, que aparece ao fundo, desfocado e sem o rosto no quadro), licença Pexels, sem atribuição obrigatória. Clipe inteiro de 10 s, sem som, 1920 px. Também é a foto do OG da home.

## Critérios de escolha

Cenas naturais e documentais, em cores. Mãos e figuras de costas em temas sensíveis (pensão, BPC). Nada de sorriso posado para a câmera, bandeiras de outros países ou martelo de juiz (não é usado no Brasil). Sem marca d'água, sem texto na imagem, de preferência horizontal.

2532363173 e 2744179163 também foram licenciadas, mas saíram do site por serem P&B no original.

## Imagens novas (posts e páginas)

O escritório não tem acesso à conta do Shutterstock. Para imagens novas, a ordem de preferência é:

1. **Foto enviada pela cliente** (do escritório, de eventos, da própria advogada).
2. **Banco gratuito** com licença que permite uso comercial sem atribuição: [Pexels](https://www.pexels.com/license/) ou [Unsplash](https://unsplash.com/license).
3. **Pedido específico** da cliente, quando ela já tem a imagem em mente.

Nunca use imagem gerada por IA representando pessoas reais ou cenas jurídicas, nem foto com marca d'água ou texto sobre a imagem.

### Processo

1. Confira a licença na página da foto.
2. Peça permissão à pessoa antes de baixar, dizendo o nome do arquivo e de onde vem.
3. Redimensione para no máximo 2400px de largura:

   ```bash
   ffmpeg -i original.jpg -vf "scale='min(2400,iw)':-2:flags=lanczos" -q:v 4 public/images/blog/<slug>.jpg
   ```

4. Grave a origem no próprio arquivo:

   ```bash
   npm run tag-image -- public/images/blog/<slug>.jpg "Pexels 1234567 (https://www.pexels.com/photo/1234567/), Pexels License. Resized."
   ```

   Para foto da cliente: `"Photo provided by the client. Resized."`

5. Registre na tabela "Imagens do blog" abaixo, uma linha por foto, neste formato:

   ```
   | `blog/auxilio-acidente.jpg` | post auxílio-acidente | Pexels 1234567 | https://www.pexels.com/photo/1234567/ |
   ```

   O nome do arquivo entre crases é o que o `npm run check` procura.
6. Rode `npm run check`. Ele acusa imagem sem registro ou sem origem gravada.

Cada post tem a sua própria capa em `public/images/blog/`. Não reaproveite as fotos das páginas de serviço (a tabela de licenças acima): o leitor que passa do serviço para o post veria a mesma imagem duas vezes.

A capa do post aparece em 21/9 no topo e em 4/3 na listagem, então prefira fotos horizontais com o assunto no centro.

## Imagens do blog

| Arquivo | Onde aparece | Origem | Link |
| --- | --- | --- | --- |
| `blog/regras-de-transicao-da-aposentadoria.jpg` | post regras de transição | Pexels 6918494 | https://www.pexels.com/photo/6918494/ |
| `blog/bpc-loas-quem-tem-direito.jpg` | post BPC/LOAS | Pexels 17408384 | https://www.pexels.com/photo/17408384/ |
| `blog/auxilio-acidente-depois-de-voltar-ao-trabalho.jpg` | post auxílio-acidente | Pexels 20860594 | https://www.pexels.com/photo/20860594/ |
| `blog/aposentadoria-pcd-como-se-preparar.jpg` | post aposentadoria da pessoa com deficiência | Pexels 8437063 | https://www.pexels.com/photo/8437063/ |
