"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { mainNav, site, whatsappLink } from "@/lib/site";
import { services } from "@/content/services";
import { useLenis } from "@/components/motion/smooth-scroll";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [dark, setDark] = useState(pathname === "/");
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  // Hide on scroll down, show on scroll up. The text color follows whatever
  // section sits under the bar: sections marked data-theme="dark" get white.
  // (mix-blend-difference can't be used: view-transition-name isolates the header.)
  useEffect(() => {
    let frame = 0;
    const sample = () => {
      frame = 0;
      const y = window.scrollY;
      setHidden(y > 160 && y > lastY.current);
      setScrolled(y > 80);
      lastY.current = y;
      const under = document
        .elementsFromPoint(window.innerWidth / 2, 36)
        .find((el) => !el.closest("header"));
      setDark(under?.closest("[data-theme]")?.getAttribute("data-theme") === "dark");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sample);
    };
    const t = setTimeout(sample, 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Close the menu and reveal the bar whenever the route changes.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
    setHidden(false);
  }

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  // Escape closes the menu and hands focus back to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header style={{ viewTransitionName: "site-header" }} className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <a
        href="#conteudo"
        className="pointer-events-auto sr-only rounded-btn bg-paper px-4 py-2 text-ink focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>

      <div
        className={`flex h-[var(--header-h)] items-center justify-between px-[calc(var(--grid-margin)+4px)] transition-[transform,color,background-color] duration-700 ease-[var(--ease-out-expo)] md:px-[calc(var(--grid-margin)+12px)] ${dark ? "text-paper" : "text-ink"} ${
          scrolled ? (dark ? "bg-black/25 backdrop-blur-xl" : "bg-white/80 backdrop-blur-xl") : "bg-transparent"
        } ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <Link href="/" className="pointer-events-auto" aria-label={`${site.name}, página inicial`}>
          <Logo />
        </Link>

        <nav aria-label="Principal" className="pointer-events-auto hidden items-center gap-7 md:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                aria-current={active ? "page" : undefined}
                className={`body-sm link-u ${active ? "bg-[length:100%_1px]" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/pre-analise" className={`body-sm rounded-[10px] px-3.5 py-2 transition-[background-color,color,opacity] duration-700 hover:opacity-80 ${dark ? "bg-paper text-ink" : "bg-ink text-paper"}`}>
            Pré-análise
          </Link>
        </nav>

        <button
          type="button"
          className="pointer-events-auto body-sm flex items-center gap-2 md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          ref={toggleRef}
          onClick={() => setOpen(true)}
        >
          Menu <span className="text-lg leading-none">+</span>
        </button>
      </div>

      <MobileMenu
        open={open}
        onClose={() => {
          setOpen(false);
          toggleRef.current?.focus();
        }}
        pathname={pathname}
      />
    </header>
  );
}

function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const panel = useRef<HTMLDivElement>(null);

  // Move focus into the panel on open and keep Tab cycling inside it.
  useEffect(() => {
    const el = panel.current;
    if (!open || !el) return;
    const focusables = () => [...el.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
    const t = setTimeout(() => focusables()[1]?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    el.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      el.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={panel}
      id="menu-mobile"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className={`fixed inset-0 z-50 flex flex-col bg-ink text-paper transition-[clip-path] duration-700 ease-[var(--ease-in-out-quart)] md:hidden ${
        open ? "pointer-events-auto [clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
      }`}
      data-lenis-prevent
    >
      <div className="flex h-[var(--header-h)] items-center justify-between px-[calc(var(--grid-margin)+4px)]">
        <Logo compact />
        <button type="button" onClick={onClose} className="body-sm flex items-center gap-2">
          Fechar <span className="text-lg leading-none">×</span>
        </button>
      </div>

      <nav aria-label="Menu mobile" className="flex flex-1 flex-col overflow-y-auto px-[calc(var(--grid-margin)+4px)] pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <ul className="flex flex-col">
          {[{ label: "Início", href: "/" }, ...mainNav, { label: "Pré-análise", href: "/pre-analise" }].map((item, i) => (
            <li key={item.href} className="border-b border-white/10">
              <Link
                href={item.href}
                onClick={onClose}
                aria-current={pathname === item.href ? "page" : undefined}
                className="flex items-baseline justify-between py-3 text-[34px] leading-none font-bold tracking-[-0.04em]"
                style={{ transitionDelay: open ? `${120 + i * 40}ms` : "0ms" }}
              >
                {item.label}
                <span className="label-mono text-white/40">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="label-mono mt-10 text-white/50">Serviços</p>
        <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/servicos/${s.slug}`} prefetch onClick={onClose} className="body-sm text-white/80">
                {s.short}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-2 pt-10">
          <a href={whatsappLink("Olá! Gostaria de falar com a Dra. Andressa.")} target="_blank" rel="noopener noreferrer" className="btn btn--light w-full justify-center">
            <span className="btn__inner">Falar no WhatsApp</span>
          </a>
          <a href={site.clientArea} target="_blank" rel="noopener noreferrer" className="btn btn--glass w-full justify-center">
            <span className="btn__inner">Área do cliente</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
