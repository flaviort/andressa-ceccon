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
| `calculos.jpg` | Cálculos previdenciários | 2763305203 |
| `maos.jpg` | OG de /pre-analise | 2741819071 |
| `cta.jpg` | CTA final em tela cheia | 2581692597 |
| `gestante.jpg` | Galáxia | 2678349491 |

Página de cada imagem: `https://www.shutterstock.com/image-photo/-<ID>`. O histórico de licenças fica na conta Shutterstock (Minha conta, Histórico de downloads).

## Outras

- `andressa.jpg`: foto enviada pela cliente (recorte da direita, blazer branco), 760x1024.
- `public/video/balanca-justica.mp4` e `.webm` (pôster `.jpg`): Pexels, vídeo 5637303 (balança da Justiça sobre a mesa de um advogado, que aparece ao fundo, desfocado e sem o rosto no quadro), licença Pexels, sem atribuição obrigatória. Clipe inteiro de 10 s, sem som, 1920 px. Também é a foto do OG da home.

## Critérios de escolha

Cenas naturais e documentais, em cores. Mãos e figuras de costas em temas sensíveis (pensão, BPC). Nada de sorriso posado para a câmera, bandeiras de outros países ou martelo de juiz (não é usado no Brasil).

2532363173 e 2744179163 também foram licenciadas, mas saíram do site por serem P&B no original.
