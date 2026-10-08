import { PageTransition } from "@/components/motion/page-transition";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ui/contact-form";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { pageGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

const meta = {
  title: "Contato",
  description:
    "Fale com a Dra. Andressa Ceccon pelo WhatsApp (41) 98467-4841. Escritório no Centro de Curitiba/PR, com atendimento online para todo o Brasil.",
  path: "/contato",
};

export const metadata = pageMetadata(meta);

export default function ContatoPage() {
  const mapQuery = encodeURIComponent(`${site.address.street}, ${site.address.city} ${site.address.state}`);
  return (
    <PageTransition>
      <JsonLd
        data={pageGraph({
          type: "ContactPage",
          path: meta.path,
          name: meta.title,
          description: meta.description,
          trail: [{ name: "Início", path: "/" }, { name: "Contato", path: meta.path }],
        })}
      />
      <PageHeader
        crumbs={[{ label: "Início", href: "/" }, { label: "Contato" }]}
        title={
          <>
            <span className="block">Vamos</span>
            <span className="block">conversar.</span>
          </>
        }
      />

      <section className="container-x grid grid-cols-12 gap-x-[var(--grid-gutter)] gap-y-12 pb-24 md:pb-36">
        <Reveal className="col-span-12 flex flex-col md:col-span-5">
          {[
            {
              k: "WhatsApp",
              v: site.phoneDisplay,
              href: whatsappLink("Olá! Gostaria de falar com a Dra. Andressa."),
            },
            {
              k: "Endereço",
              v: `${site.address.street}, ${site.address.district}, ${site.address.city}/${site.address.state}, CEP ${site.address.zip}`,
              href: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
            },
            { k: "Instagram", v: "@andressacecconadvocacia", href: site.social.instagram },
            { k: "Clientes", v: "Área do cliente", href: site.clientArea },
          ].map((item) => (
            <a
              key={item.k}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-6 border-t border-black/10 py-6 last:border-b"
            >
              <span>
                <span className="label-mono block text-ash">{item.k}</span>
                <span className="heading-xs mt-2 block max-w-[24ch]">{item.v}</span>
              </span>
              <span className="text-xl transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>
          ))}
          <p className="body-sm mt-8 max-w-[40ch] text-ash">
            Atendimento 100% online para todo o Brasil. Reuniões presenciais no escritório em Curitiba mediante
            agendamento.
          </p>
        </Reveal>

        <div className="col-span-12 rounded-card bg-ink p-6 text-paper md:col-span-6 md:col-start-7 md:p-10">
          <p className="label-mono text-white/50">Mensagem</p>
          <h2 className="heading-sm mt-4 mb-8">Conte o que você precisa.</h2>
          <ContactForm />
          <div className="mt-10 border-t border-white/10 pt-8">
            <Button href="/pre-analise" variant="glass" size="small">
              Prefere responder a pré-análise?
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
