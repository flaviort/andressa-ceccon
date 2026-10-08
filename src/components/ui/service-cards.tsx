import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import type { Service } from "@/content/services";

/** Three-up service cards used under service pages and blog posts. */
export function ServiceCards({ items }: { items: Service[] }) {
  return (
    <Reveal className="grid gap-[var(--grid-gutter)] md:grid-cols-3">
      {items.map((r) => (
        <Link key={r.slug} href={`/servicos/${r.slug}`} prefetch className="group block">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-fog">
            <Image
              src={r.image}
              alt={r.imageAlt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-105"
            />
          </div>
          <div className="mt-4 flex gap-4">
            <span className="label-mono pt-1 text-bronze">{r.index}</span>
            <div>
              <h3 className="text-[1.3125rem] leading-[1.2] font-medium tracking-[-0.02em]">{r.title}</h3>
              <p className="body-sm mt-2 text-ash">{r.excerpt}</p>
            </div>
          </div>
        </Link>
      ))}
    </Reveal>
  );
}
