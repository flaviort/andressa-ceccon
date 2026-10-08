"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function Counter({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const obj = { v: 0 };
      gsap.to(obj, {
        v: to,
        duration: 2,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          el.textContent = String(Math.round(obj.v));
        },
      });
    });
    return () => mm.revert();
  });

  return (
    <span ref={ref} className={className}>
      {to}
    </span>
  );
}
