import { site } from "@/lib/site";

const icons = {
  // Instagram's own glyph is an outline, so it is drawn with a stroke.
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-5">
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.4" cy="6.6" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M13.9 21v-8.2h2.75l.41-3.2H13.9V7.56c0-.93.26-1.56 1.59-1.56h1.7V3.14A22.7 22.7 0 0 0 14.71 3c-2.45 0-4.13 1.5-4.13 4.24V9.6H7.81v3.2h2.77V21h3.32Z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M16.6 3c.33 2.15 1.6 3.66 3.9 3.84v3.03a7.46 7.46 0 0 1-3.83-1.2v5.68c0 3.58-2.62 6.15-6.02 6.15A5.97 5.97 0 0 1 4.6 14.5c0-3.62 3.05-6.24 6.85-5.86v3.12c-1.86-.37-3.66.8-3.66 2.74 0 1.58 1.27 2.86 2.86 2.86 1.68 0 2.85-1.21 2.85-3.16V3h3.1Z" />
    </svg>
  ),
} as const;

const labels = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok" } as const;

/** Round icon links for each network in `site.social` that has an address. */
export function SocialLinks({ className = "" }: { className?: string }) {
  const networks = (Object.keys(labels) as (keyof typeof labels)[]).filter((k) => site.social[k]);
  return (
    <ul className={`flex gap-2 ${className}`}>
      {networks.map((k) => (
        <li key={k}>
          <a
            href={site.social[k]!}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={labels[k]}
            className="grid size-11 place-items-center rounded-full border border-white/20 text-paper transition hover:border-paper hover:bg-paper hover:text-ink-deep"
          >
            {icons[k]}
          </a>
        </li>
      ))}
    </ul>
  );
}
