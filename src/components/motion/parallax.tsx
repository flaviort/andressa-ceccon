"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Moves the child vertically against the scroll. Wrap an absolutely filled image. */
export function Parallax({
  children,
  className,
  amount = 12,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          inner.current,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? "relative"}`}>
      <div ref={inner} className="absolute inset-x-0 -inset-y-[15%]">
        {children}
      </div>
    </div>
  );
}
