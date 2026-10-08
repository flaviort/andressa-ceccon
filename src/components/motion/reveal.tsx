"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Fades and lifts its direct children in sequence when they enter the viewport. */
export function Reveal({
  children,
  className,
  stagger = 0.08,
  y = 24,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  as?: "div" | "ul" | "ol" | "section" | "dl";
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(el.children, {
          y,
          autoAlpha: 0,
          duration: 1.1,
          stagger,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}

/** Opens an image from the bottom edge with a clip-path wipe. */
export function ClipReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { clipPath: "inset(18% 6% 0% 6% round 6px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 6px)",
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 95%", end: "top 35%", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
