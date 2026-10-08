import Link from "next/link";
import { services } from "@/content/services";
import { FooterOverscroll } from "@/components/layout/footer-overscroll";
import { FooterWordmark } from "@/components/motion/footer-wordmark";
import { mainNav, site, whatsappLink } from "@/lib/site";

// Cached at build time; the copyright year refreshes on the next deploy.
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await currentYear();
  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-ink-deep text-paper">
      <FooterOverscroll />
      <div className="container-x grid grid-cols-12 gap-x-[var(--grid-gutter)] gap-y-12 pt-20 pb-10 md:pt-28">
        <nav aria-label="Rodapé" className="col-span-12 md:col-span-3">
          <ul className="flex flex-col gap-1">
            {[{ label: "Início", href: "/" }, ...mainNav, { label: "Pré-análise", href: "/pre-analise" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[1.375rem] leading-tight font-medium tracking-[-0.02em] link-u">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-12 md:col-span-4">
          <p className="label-mono mb-4 text-paper/65">Serviços</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/servicos/${s.slug}`} prefetch className="body-sm link-u text-white/80 hover:text-paper">
                  {s.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 flex flex-col gap-8 md:col-span-4 md:col-start-9">
          <p className="body-lg text-white/80">
            Advocacia previdenciária em Curitiba. Atendemos no escritório, no Centro, e online para todo o Brasil.
          </p>
          <address className="body-sm flex flex-col gap-1 text-white/60 not-italic">
            <span>{site.address.street}</span>
            <span>
              {site.address.district}, {site.address.city}/{site.address.state}, CEP {site.address.zip}
            </span>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-u mt-2 w-fit text-paper">
              WhatsApp {site.phoneDisplay}
            </a>
          </address>
          <ul className="body-sm flex flex-wrap gap-x-5 gap-y-1">
            <li>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="link-u">
                @andressacecconadvocacia
              </a>
            </li>
            <li>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="link-u">
                Facebook
              </a>
            </li>
            <li>
              <a href={site.clientArea} target="_blank" rel="noopener noreferrer" className="link-u">
                Área do cliente
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x pb-8 md:pb-12" aria-hidden="true">
        {/* The firm's logotype, full width, in a single solid colour. */}
        <FooterWordmark />
      </div>

      <div className="container-x label-mono flex flex-col gap-3 border-t border-white/10 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-paper/50 md:flex-row md:items-center md:justify-between">
        <span>
          © {year} {site.name} · {site.oab}
        </span>
        <span className="flex gap-6">
          <Link href="/politica-de-privacidade" className="link-u hover:text-paper">
            Política de privacidade
          </Link>
          <span>Curitiba/PR</span>
        </span>
      </div>
    </footer>
  );
}
