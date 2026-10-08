"use client";

import { useEffect, useRef } from "react";

// Footers currently on screen. Next keeps visited pages mounted but hidden, so
// more than one footer can exist at a time and each reports on its own.
const visible = new Set<Element>();

function paint() {
  document.documentElement.style.backgroundColor = visible.size ? "var(--color-ink-deep)" : "";
}

/**
 * When a phone scrolls past the end of the page, iOS bounces and shows the
 * root background below the footer, an ivory band under a navy footer. While
 * the footer is in view the root turns navy, so the bounce matches it. The
 * body keeps its own ivory background, so nothing else on the page changes,
 * and the top bounce stays ivory because the footer is out of view there.
 */
export function FooterOverscroll() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const footer = ref.current?.closest("footer");
    if (!footer) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) visible.add(footer);
      else visible.delete(footer);
      paint();
    });
    io.observe(footer);
    return () => {
      io.disconnect();
      visible.delete(footer);
      paint();
    };
  }, []);

  return <span ref={ref} hidden />;
}
