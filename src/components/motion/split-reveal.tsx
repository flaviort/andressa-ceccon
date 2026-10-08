"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type Props = {
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  className?: string;
  children: React.ReactNode;
  /** "load" plays right away (page heroes), "scroll" waits for the viewport. */
  trigger?: "load" | "scroll";
  delay?: number;
  stagger?: number;
  type?: "lines" | "words" | "chars";
};

export function SplitReveal({
  as: Tag = "h2",
  className,
  children,
  trigger = "scroll",
  delay = 0,
  stagger = 0.08,
  type = "lines",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(el, {
          type: type === "lines" ? "lines" : `lines,${type}`,
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            const targets = type === "lines" ? self.lines : type === "words" ? self.words : self.chars;
            return gsap.from(targets, {
              yPercent: 110,
              duration: 1.4,
              stagger,
              delay: trigger === "load" ? delay + 0.35 : delay,
              ease: "expo.out",
              scrollTrigger:
                trigger === "scroll" ? { trigger: el, start: "top 88%", once: true } : undefined,
            });
          },
        });
        return () => split.revert();
      });
      gsap.set(el, { autoAlpha: 1 });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} data-split={trigger}>
      {children}
    </Tag>
  );
}
