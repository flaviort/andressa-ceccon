---
name: revisar
description: Use antes de publicar qualquer mudança no site, ou quando a pessoa pedir para conferir, revisar ou ver se está tudo certo. Roda as checagens automáticas e percorre o checklist de marca, OAB e SEO.
---

# Revisar

Rode na ordem e só siga se cada passo passar.

1. `npm run check`. Se falhar, corrija cada item listado. Termo vetado: reescreva a frase, nunca edite a lista `BANNED` só para passar.
2. `npm test` e `npm run lint`.
3. `npm run build`. Se falhar, leia a mensagem inteira; erros de post vêm em português com o nome do arquivo.
4. Abra o site local (servidor `dev` do `.claude/launch.json`, porta 3100) no navegador do Claude e confira cada página que mudou.

## Checklist do que o script não pega

- [ ] Texto: voz direta, sem jargão sem explicação, sem promessa de resultado, sem comparação com outros escritórios. Cita idade, prazo, valor ou percentual? Então precisa da aprovação da Dra. Andressa (avise na hora da prévia).
- [ ] Um único h1. Títulos em `SplitReveal`, destaque em `<em>` só muda a cor.
- [ ] Cores da paleta (`_docs/identidade-visual.md`). Dourado só em fundo escuro; no claro, bronze. Nada de preto puro.
- [ ] Nada de itálico, nada de canto muito arredondado (cards 6px, botões 5px, miniaturas 4px).
- [ ] Imagem: adequada ao tema, cores originais, sem marca d'água, `alt` descreve o que aparece, registrada em `_docs/imagery.md`.
- [ ] Celular (375px): sem rolagem horizontal, textos legíveis, botões tocáveis.
- [ ] Com "reduzir movimento" (emular `prefers-reduced-motion: reduce`): página aparece completa, sem animação travada.
- [ ] Console do navegador sem erros. Links internos funcionando.
- [ ] Página nova: `pageMetadata`, `pageGraph`, `opengraph-image.tsx`, sitemap, `<PageTransition>` (ver `_docs/seo.md`).

Ao terminar, diga em uma ou duas frases o que conferiu e se encontrou algo.
