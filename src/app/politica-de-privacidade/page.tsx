import { PageTransition } from "@/components/motion/page-transition";
import { PageHeader } from "@/components/ui/page-header";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Política de Privacidade",
  description: "Como o site da Andressa Ceccon Advocacia trata dados pessoais, em conformidade com a LGPD.",
  path: "/politica-de-privacidade",
});

export default function PrivacidadePage() {
  return (
    <PageTransition>
      <PageHeader crumbs={[{ label: "Início", href: "/" }, { label: "Privacidade" }]} title="Política de privacidade" />
      <article className="prose-legal container-x max-w-[820px] pb-24 md:ml-[calc(41.66%)] md:pb-36">
        <p>
          Esta política explica como o site {site.url.replace("https://", "")} trata dados pessoais, nos termos da Lei
          Geral de Proteção de Dados (Lei 13.709/2018).
        </p>
        <h2>Quais dados coletamos</h2>
        <p>
          O site não possui banco de dados nem armazena informações enviadas pelos formulários. Os formulários de
          contato e de pré-análise apenas montam uma mensagem que você mesmo envia pelo WhatsApp. A partir desse envio,
          os dados passam a ser tratados no atendimento, exclusivamente para analisar e responder à sua solicitação.
        </p>
        <h2>Uso dos dados no atendimento</h2>
        <p>
          As informações compartilhadas durante o atendimento são protegidas pelo sigilo profissional da advocacia e
          usadas apenas para a prestação dos serviços jurídicos contratados ou para a resposta à sua consulta.
        </p>
        <h2>Cookies</h2>
        <p>
          O site utiliza apenas recursos técnicos necessários para o funcionamento das páginas. Caso ferramentas de
          estatística sejam adicionadas no futuro, esta política será atualizada.
        </p>
        <h2>Seus direitos</h2>
        <p>
          Você pode solicitar a confirmação, o acesso, a correção ou a exclusão dos seus dados a qualquer momento pelo
          WhatsApp {site.phoneDisplay}.
        </p>
        <h2>Responsável</h2>
        <p>
          {site.name}, {site.address.street}, {site.address.district}, {site.address.city}/{site.address.state}.
        </p>
      </article>
    </PageTransition>
  );
}
