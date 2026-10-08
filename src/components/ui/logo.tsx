import {
  ANDRESSA_PATHS,
  CECCON_PATHS,
  MONOGRAM_A,
  MONOGRAM_C,
  MONOGRAM_C_SHIFT,
  MONOGRAM_VIEWBOX,
  WORDMARK_VIEWBOX,
} from "@/components/ui/logo-paths";

type SvgProps = { className?: string; title?: string };

/** The firm's original "andressaceccon" logotype, without the slogan. */
export function Wordmark({ className, title }: SvgProps) {
  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      fill="currentColor"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {[...ANDRESSA_PATHS, ...CECCON_PATHS].map((d) => (
        <path key={d.slice(0, 24)} d={d} />
      ))}
    </svg>
  );
}

/** "ac" monogram built from the logotype's own letters. */
export function Monogram({ className, title }: SvgProps) {
  return (
    <svg
      viewBox={MONOGRAM_VIEWBOX}
      fill="currentColor"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path d={MONOGRAM_A} />
      <path d={MONOGRAM_C} transform={`translate(${MONOGRAM_C_SHIFT} 0)`} />
    </svg>
  );
}

/**
 * Header lockup. Inside the condensed header (see .logo in globals.css) the
 * full logotype crossfades into the monogram while the box narrows, the way
 * the reference collapses its wordmark into the "W" mark.
 */
export function Logo({ compact = false }: { compact?: boolean }) {
  if (compact) return <Monogram className="h-[17px] w-auto" />;
  return (
    <span className="logo">
      <Wordmark className="logo__full" />
      {/* "ac" has no ascenders, so it sits low in the logotype's box. Lift it to line up with the nav labels. */}
      <Monogram className="logo__mark -translate-y-[calc(var(--logo-h)*0.1)]" />
    </span>
  );
}
