export const site = {
  name: "Andressa Ceccon Advocacia",
  shortName: "Andressa Ceccon",
  lawyer: "Dra. Andressa Ceccon",
  oab: "OAB/PR 74.854",
  url: "https://andressaceccon.com.br",
  description:
    "Advocacia previdenciária em Curitiba, com atendimento presencial no escritório e online para todo o Brasil. Planejamento previdenciário, aposentadorias, pensão por morte, BPC/LOAS, auxílio-doença e revisão de benefícios do INSS.",
  phoneDisplay: "+55 41 98467-4841",
  phoneE164: "+5541984674841",
  whatsapp: "5541984674841",
  // Inbox that receives the contact form (via Resend). Not shown on the site.
  // Still to be confirmed with the client; CONTACT_TO overrides it.
  contactInbox: "contato@andressaceccon.com.br",
  address: {
    street: "Rua Alfredo Bufren, 285, Bloco A, Sobreloja",
    district: "Centro",
    city: "Curitiba",
    state: "PR",
    zip: "80020-240",
    country: "BR",
  },
  social: {
    instagram: "https://www.instagram.com/andressacecconadvocacia",
    facebook: "https://www.facebook.com/andressacecconadvocacia",
  },
  clientArea: "https://astreasoftware.appspot.com",
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const mainNav = [
  { label: "Escritório", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Planejamento", href: "/servicos/planejamento-previdenciario" },
  { label: "Contato", href: "/contato" },
] as const;
