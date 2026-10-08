"use client";

import { useRef } from "react";
import { Wordmark } from "@/components/ui/logo";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * The footer logotype. Each letter rises from below the baseline in turn when
 * it scrolls into view, as in the Saad footer. The SVG clips at its viewBox,
 * so a letter pushed down by its own height starts out hidden.
 */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("svg path", {
          yPercent: 100,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.03,
          scrollTrigger: { trigger: ref.current, start: "top bottom", toggleActions: "restart none resume none" },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <Wordmark className="block h-auto w-full select-none" />
    </div>
  );
}
