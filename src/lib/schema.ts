import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

export const ids = {
  firm: `${site.url}/#escritorio`,
  lawyer: `${site.url}/#andressa`,
  website: `${site.url}/#website`,
};

const lawyer = {
  "@type": "Person",
  "@id": ids.lawyer,
  name: "Andressa Ceccon",
  honorificPrefix: "Dra.",
  jobTitle: "Advogada previdenciária",
  image: `${site.url}/images/andressa.jpg`,
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Pontifícia Universidade Católica do Paraná" },
    { "@type": "EducationalOrganization", name: "EMATRA IX" },
  ],
  identifier: site.oab,
  worksFor: { "@id": ids.firm },
};

const firm = {
  "@type": "LegalService",
  "@id": ids.firm,
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phoneE164,
  image: `${site.url}/opengraph-image`,
  logo: { "@type": "ImageObject", url: `${site.url}/icon-512.png`, width: 512, height: 512 },
  areaServed: { "@type": "Country", name: "Brasil" },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: site.address.country,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.phoneE164,
    contactType: "customer service",
    availableLanguage: "Portuguese",
    areaServed: "BR",
  },
  sameAs: Object.values(site.social).filter(Boolean),
  founder: { "@id": ids.lawyer },
  employee: { "@id": ids.lawyer },
  knowsAbout: services.map((s) => s.title),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços de Direito Previdenciário",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, url: absoluteUrl(`/servicos/${s.slug}`) },
    })),
  },
};

const website = {
  "@type": "WebSite",
  "@id": ids.website,
  url: site.url,
  name: site.name,
  inLanguage: "pt-BR",
  publisher: { "@id": ids.firm },
};

/** Site-wide graph, rendered once in the root layout. */
export const siteGraph = { "@context": "https://schema.org", "@graph": [firm, lawyer, website] };

type PageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";

/** Per-page graph: the page node plus its breadcrumb and any extra nodes. */
export function pageGraph({
  type = "WebPage",
  path,
  name,
  description,
  trail,
  extra = [],
}: {
  type?: PageType;
  path: string;
  name: string;
  description: string;
  trail: { name: string; path: string }[];
  extra?: Record<string, unknown>[];
}) {
  const url = absoluteUrl(path);
  const ogPath = path === "/" ? "/opengraph-image" : `${path}/opengraph-image`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#pagina`,
        url,
        name,
        description,
        inLanguage: "pt-BR",
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.firm },
        primaryImageOfPage: absoluteUrl(ogPath),
        breadcrumb: { "@id": `${url}#trilha` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#trilha`,
        itemListElement: trail.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      },
      ...extra,
    ],
  };
}
