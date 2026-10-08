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
  const [dark, setDark] = useState(pathname === "/");
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  // The bar never hides: past 80px it condenses into the navy pill and stays.
  // At the top of the page the text colour follows the section under the bar
  // (data-theme="dark" gets ivory).
  useEffect(() => {
    let frame = 0;
    const sample = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 80);
      const under = document
        .elementsFromPoint(window.innerWidth / 2, 36)
        .find((el) => !el.closest("header"));
      setDark(under?.closest("[data-theme]")?.getAttribute("data-theme") === "dark");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sample);
    };
    // After a route change the new page may still be streaming in or sitting
    // under the view transition overlay, so sample again once it settles.
    const timers = [60, 350, 800, 1400].map((ms) => setTimeout(sample, ms));
    const vt = (document as Document & { activeViewTransition?: ViewTransition | null }).activeViewTransition;
    vt?.finished.then(sample, sample);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Close the menu whenever the route changes.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
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

      {/* Mirrors the reference header: a full-width bar at the top of the page
          that condenses into a centred navy pill once the page scrolls. The
          wordmark collapses into the "AC" monogram instead of disappearing. */}
      <div
        data-compact={scrolled || undefined}
        className="site-header__bar"
      >
        <div
          className={`site-header__inner pointer-events-auto ${scrolled || dark ? "text-paper [--accent:var(--color-gold)]" : "text-ink"}`}
        >
          <span className="site-header__bg" aria-hidden="true" />
          <Link href="/" className="relative" aria-label={`${site.name}, página inicial`}>
            <Logo />
          </Link>

          <nav aria-label="Principal" className="site-header__nav relative hidden items-center md:flex">
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
            <Link
              href="/pre-analise"
              className={`body-sm rounded-[4px] px-3.5 py-1.5 transition-[background-color,color] duration-500 hover:opacity-85 ${
                scrolled || dark ? "bg-gold text-ink" : "bg-ink text-paper"
              }`}
            >
              Pré-análise
            </Link>
          </nav>

          <button
            type="button"
            className="relative body-sm flex items-center gap-2 md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            ref={toggleRef}
            onClick={() => setOpen(true)}
          >
            Menu <span className="text-lg leading-none">+</span>
          </button>
        </div>
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
                className="flex items-baseline justify-between py-3 text-[34px] leading-none font-semibold tracking-[-0.04em]"
                style={{ transitionDelay: open ? `${120 + i * 40}ms` : "0ms" }}
              >
                {item.label}
                <span className="label-mono text-gold">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="label-mono mt-10 text-gold">Serviços</p>
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
