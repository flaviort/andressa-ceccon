"use client";

import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrubText } from "@/components/motion/scrub-text";
import { gsap, useGSAP } from "@/lib/gsap";

// Scattered tiles around a centered statement, each drifting at its own speed.
const tiles = [
  { src: "/images/rural.jpg", x: "4%", y: "6%", w: "11vw", speed: -40 },
  { src: "/images/gestante.jpg", x: "22%", y: "-4%", w: "7vw", speed: 60 },
  { src: "/images/especial.jpg", x: "80%", y: "2%", w: "9vw", speed: -70 },
  { src: "/images/idade.jpg", x: "90%", y: "38%", w: "8vw", speed: 30 },
  { src: "/images/bpc.jpg", x: "10%", y: "52%", w: "9vw", speed: -20 },
  { src: "/images/pcd.jpg", x: "2%", y: "80%", w: "7vw", speed: 80 },
  { src: "/images/pensao.jpg", x: "70%", y: "78%", w: "10vw", speed: -50 },
  { src: "/images/maternidade.jpg", x: "40%", y: "92%", w: "6vw", speed: 40 },
  { src: "/images/incapacidade.jpg", x: "88%", y: "92%", w: "7vw", speed: -90 },
];

export function ImageGalaxy() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-tile]").forEach((tile) => {
          const speed = Number(tile.dataset.speed);
          gsap.fromTo(
            tile,
            { y: speed * 2.2, scale: 0.85 },
            {
              y: -speed * 2.2,
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative py-28 md:py-48" aria-labelledby="galaxy-title">
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
        {tiles.map((t) => (
          <div
            key={t.src}
            data-tile
            data-speed={t.speed}
            className="absolute overflow-hidden rounded-[6px]"
            style={{ left: t.x, top: t.y, width: t.w, aspectRatio: "4 / 5" }}
          >
            <Image src={t.src} alt="" fill sizes="12vw" className="object-cover" />
          </div>
        ))}
      </div>

      <div className="container-x relative flex flex-col items-center text-center">
        <ScrubText as="h2" className="heading-lg max-w-[13ch] md:display-lg md:max-w-[13ch]">
          <span id="galaxy-title">Um direito para cada <em>etapa da vida.</em></span>
        </ScrubText>
        <p className="body-lg mt-8 max-w-[44ch] text-ash md:mt-10">
          Aposentadoria, pensão, maternidade, incapacidade, assistência. A Previdência acompanha você em momentos
          muito diferentes, e cada um pede uma estratégia própria.
        </p>
        <Button href="/servicos" className="mt-8">
          Conheça os serviços
        </Button>
      </div>

      <div className="container-x mt-14 grid grid-cols-3 gap-2 md:hidden" aria-hidden="true">
        {tiles.slice(0, 6).map((t) => (
          <div key={t.src} className="relative aspect-[4/5] overflow-hidden rounded-[6px]">
            <Image src={t.src} alt="" fill sizes="33vw" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
