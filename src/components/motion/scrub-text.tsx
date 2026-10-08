"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

/**
 * Words start in a light gray and fill to full ink as the block scrolls
 * through the viewport, like the reference site's long statements.
 */
export function ScrubText({
  as: Tag = "p",
  className,
  children,
  tone = "dark",
}: {
  as?: "p" | "h2" | "h3" | "div";
  className?: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(el, { type: "words", autoSplit: true });
        const from = tone === "dark" ? "#c9c2b4" : "rgba(248,246,241,0.28)";
        const tween = gsap.fromTo(
          split.words,
          { color: from },
          {
            color: tone === "dark" ? "#1b2848" : "#f8f6f1",
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 45%", scrub: true },
          },
        );
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          split.revert();
        };
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
