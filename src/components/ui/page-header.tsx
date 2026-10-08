import Link from "next/link";
import { SplitReveal } from "@/components/motion/split-reveal";

export function PageHeader({
  crumbs,
  title,
  lead,
  children,
}: {
  crumbs?: { label: string; href?: string }[];
  title: React.ReactNode;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="container-x pt-[calc(var(--header-h)+56px)] pb-14 md:pt-[calc(var(--header-h)+96px)] md:pb-20">
      {crumbs && (
        <nav aria-label="Trilha de navegação" className="label-mono mb-8 text-bronze md:mb-12">
          <ol className="flex flex-wrap items-center gap-2">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {c.href ? (
                  <Link href={c.href} className="link-u hover:text-ink">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <SplitReveal as="h1" trigger="load" className="display-lg max-w-[14ch]">
        {title}
      </SplitReveal>
      {(lead || children) && (
        <div className="mt-10 grid grid-cols-12 gap-x-[var(--grid-gutter)] md:mt-16">
          {lead && <p className="heading-xs col-span-12 max-w-[40ch] font-medium md:col-span-7 md:col-start-6">{lead}</p>}
          {children}
        </div>
      )}
    </section>
  );
}
