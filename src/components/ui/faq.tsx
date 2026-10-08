"use client";

import { useId, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Accordion with animated open/close. Answers stay in the HTML (only their
 * height animates via grid-template-rows), so search engines and find-in-page
 * still see them; FAQPage JSON-LD is emitted by the service page.
 */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();

  return (
    <div className="border-t border-ink/10">
      {items.map((item, i) => {
        const expanded = open === i;
        const panelId = `${id}-panel-${i}`;
        const buttonId = `${id}-button-${i}`;
        return (
          <div key={item.q} className="border-b border-ink/10">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="group flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left"
              >
                <span className="text-[clamp(1.125rem,1.4vw,1.375rem)] leading-[1.25] font-medium tracking-[-0.02em]">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-ink/[0.06] text-lg leading-none transition-[transform,background-color] duration-500 ease-[var(--ease-out-expo)] group-hover:bg-ink/[0.12] ${
                    expanded ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              // Page height changed, so scroll-linked animations below need new positions.
              onTransitionEnd={(e) => e.propertyName === "grid-template-rows" && ScrollTrigger.refresh()}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none ${
                expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden" inert={!expanded}>
                <p className="body-lg max-w-[60ch] pb-7 text-[#3a4257]">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
