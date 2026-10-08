"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import type { Service } from "@/content/services";

export function ServicesCarousel({ items }: { items: Service[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () =>
      setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Drag to scroll with a mouse; touch devices scroll natively.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let down = false;
    let startX = 0;
    let startLeft = 0;
    let moved = false;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.style.scrollSnapType = "none";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      down = false;
      el.style.scrollSnapType = "";
    };
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 300) + 20) * 2, behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-32" aria-labelledby="carousel-title">
      <div className="container-x mb-8 flex items-end justify-between gap-6 md:mb-10">
        <div className="flex items-baseline gap-5">
          <h2 id="carousel-title" className="heading-sm">
            Serviços
          </h2>
          <Link href="/servicos" className="body-md link-u text-ash">
            Ver todos ↗
          </Link>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => scrollBy(-1)} disabled={edge.start} aria-label="Anterior" className="grid size-11 place-items-center rounded-btn bg-black/[0.06] transition hover:bg-black/[0.12] disabled:opacity-30">
            ←
          </button>
          <button type="button" onClick={() => scrollBy(1)} disabled={edge.end} aria-label="Próximo" className="grid size-11 place-items-center rounded-btn bg-black/[0.06] transition hover:bg-black/[0.12] disabled:opacity-30">
            →
          </button>
        </div>
      </div>

      <ul
        ref={track}
        className="flex cursor-grab snap-x snap-mandatory gap-[var(--grid-gutter)] overflow-x-auto scroll-px-[var(--grid-margin)] px-[var(--grid-margin)] pb-4 select-none [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        {items.map((s) => (
          <li key={s.slug} className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[calc((100vw-2*var(--grid-margin)-3*var(--grid-gutter))/4)]">
            <Link href={`/servicos/${s.slug}`} prefetch draggable={false} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-fog">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  draggable={false}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 44vw, 78vw"
                  className="object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex gap-4">
                <span className="label-mono pt-1 text-ash">{s.index}</span>
                <div>
                  <h3 className="text-[19px] leading-[1.2] font-medium tracking-[-0.02em]">{s.title}</h3>
                  <p className="body-sm mt-2 text-ash">{s.excerpt}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
