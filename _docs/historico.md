# Histórico de decisões

Por que algumas coisas são como são. Antes de desfazer uma destas decisões, leia o motivo.

## Quem usa o projeto

O site foi entregue pronto ao escritório. No dia a dia, a Dra. Andressa e o marido pedem mudanças ao Claude Code, sem conhecimento técnico. Os desenvolvedores que construíram o site continuam com acesso ao repositório para mudanças maiores. Por isso as instruções do projeto falam com o Claude, e toda publicação passa por prévia e aprovação.

## Referência visual

O site substitui um WordPress simples e foi pensado para ser mais marcante e mais forte em SEO, com uma página por serviço. A estrutura e o movimento seguem wolverineworldwide.com: grid de 12 colunas com margem de 48px e gutter de 20px, botões com troca de seta no hover, header que vira pílula ao rolar, galeria flutuante de imagens, transições entre páginas e o rodapé com a marca gigante.

## Tipografia

A referência usa ABC Diatype, uma fonte paga. Inter Tight é a alternativa gratuita mais próxima. Os pesos ficaram mais leves que os da referência (600 nos títulos em vez de 700) para combinar com o tom de um escritório de advocacia. Itálico não é usado em lugar nenhum; o destaque de títulos é feito só com cor.

## Cores

A paleta veio dos posts do próprio escritório nas redes: azul-marinho, dourado areia e marfim. O dourado não tem contraste suficiente sobre o marfim, então no claro ele vira o bronze (`#7e6236`).

## Fotos

Cenas naturais e documentais, em cores, nunca filtradas. Duas fotos licenciadas no Shutterstock (2532363173 e 2744179163) saíram do site por serem preto e branco no original. As 15 do site estão licenciadas na conta Shutterstock de quem construiu o site; o escritório não tem acesso a ela, por isso imagens novas vêm de bancos gratuitos ou de fotos próprias (`_docs/imagery.md`).

## Unidades

Texto em rem para respeitar o tamanho de fonte que a pessoa escolheu no navegador. Quem aumenta a fonte padrão (comum entre pessoas mais velhas, boa parte do público do escritório) vê o site inteiro crescer junto.

## Header

A navegação completa aparece a partir de 1024px. Entre 768 e 1023px os links não cabiam ao lado do logotipo, então essa faixa usa o botão "Menu", como no celular.

## Formulários

O formulário de contato envia e-mail pelo Resend. A pré-análise não guarda nada: monta as respostas numa mensagem de WhatsApp que o próprio visitante envia, o que evita armazenar dados pessoais de saúde e renda.

## URLs antigas

As URLs do WordPress que tinham tráfego foram mantidas com redirecionamento 301 em `next.config.ts`. O site antigo não tinha posts publicados, então `/blog` foi liberado para o blog novo.

## Blog

Os posts são arquivos Markdown puros, sem MDX. Markdown é mais difícil de quebrar e qualquer pessoa consegue abrir e ler o arquivo. Os componentes da página do post (capa, autoria, cards de serviços, convite final) são fixos, para que cada post novo saia com a mesma cara sem depender de quem escreveu.

## Checagem automática

As regras que dá para conferir por script (travessão, emoji, termos vetados pela OAB, tamanho de descrição, registro de imagens) ficam em `npm run check`, para não dependerem da memória de quem escreve.

## Publicação

Por padrão, toda mudança vai por branch, prévia da Vercel, aprovação de quem pediu e pull request. Assim um erro não chega direto ao site público, e os desenvolvedores podem acompanhar pelo GitHub o que foi publicado. O escritório tem liberdade para publicar direto quando quiser (por exemplo, uma correção pequena): basta pedir, e o app só pede uma confirmação. O que fica bloqueado é o que apaga histórico (`--force`) ou publica por fora do GitHub (Vercel CLI), porque isso deixaria o site no ar diferente do repositório.
