# Checklist de lançamento

## Antes de publicar

- [x] Licenciar as fotos de banco (15 no Shutterstock, ver `_docs/imagery.md`)
- [ ] Guardar os registros de licença do Shutterstock onde a cliente possa encontrar
- [ ] Revisão jurídica dos 12 serviços e dos 2 posts de exemplo do blog pela Dra. Andressa (idades, pontos de 2026, prazos)
- [ ] Confirmar telefone, endereço e redes em `src/lib/site.ts`
- [ ] Decidir sobre analytics e, se houver cookies não essenciais, banner de consentimento (LGPD)

## Transferência para o escritório

- [ ] GitHub: transferir o repositório para a conta do escritório ou adicioná-la como colaboradora com permissão de escrita. Os desenvolvedores mantêm acesso.
- [ ] Vercel: transferir o projeto para a conta do escritório, ou recriá-lo lá ligado ao repositório.
- [ ] Vercel: conferir que cada branch gera uma prévia (Preview Deployments).
- [ ] Vercel: em Settings, Deployment Protection, desligar "Vercel Authentication" para as prévias. Ligada, a prévia pede login da Vercel no celular da cliente e no navegador do Claude.
- [ ] Vercel: recriar `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_TO` e `GOOGLE_SITE_VERIFICATION` e mover o domínio.
- [ ] Call de entrega seguindo `_docs/instalacao.md`, incluindo o teste de ponta a ponta.
- [ ] Ativar notificações de pull request no GitHub para os desenvolvedores acompanharem o que é publicado.

## Domínio e deploy

- [ ] Apontar `andressaceccon.com.br` para o Vercel e redirecionar `www` para o domínio sem `www` (painel de domínios)
- [ ] Conferir HTTPS e os headers de segurança em securityheaders.com
- [ ] Definir `GOOGLE_SITE_VERIFICATION` nas variáveis de ambiente de produção
- [ ] Formulário de contato: criar a conta no Resend, verificar o domínio e definir `RESEND_API_KEY` e `RESEND_FROM` em produção
- [ ] Confirmar com a cliente o e-mail que recebe o formulário (`contactInbox` em `src/lib/site.ts`, hoje contato@andressaceccon.com.br) e enviar uma mensagem de teste

## Busca

- [ ] Google Search Console: verificar domínio e enviar `/sitemap.xml`
- [ ] Bing Webmaster Tools: importar do Search Console
- [ ] Rich Results Test em uma página de serviço (FAQ, breadcrumb, Service)
- [ ] Atualizar o Perfil da Empresa no Google com o novo site
- [ ] Conferir os redirects 301 das URLs antigas do WordPress (em `next.config.ts`) e, no Search Console, se surgirem outras URLs antigas com erro 404

## Compartilhamento

- [ ] Testar o preview no WhatsApp, Facebook (Sharing Debugger) e LinkedIn (Post Inspector)

## Qualidade

- [ ] PageSpeed Insights no celular (meta: LCP abaixo de 2,5s)
- [ ] Testar em iPhone e Android reais: menu, formulário, vídeo do hero
- [ ] Testar com "reduzir movimento" ligado
- [ ] Abrir uma URL inexistente e conferir a página 404

## Manutenção anual

- [ ] Atualizar a regra de pontos e a idade mínima progressiva em `aposentadoria-por-tempo-de-contribuicao`
- [ ] Atualizar `UPDATED` em `src/app/sitemap.ts` sempre que o conteúdo mudar
