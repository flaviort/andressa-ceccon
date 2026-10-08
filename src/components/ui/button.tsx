import Link from "next/link";

type Variant = "default" | "dark" | "light" | "glass" | "outline";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "md" | "small";
  className?: string;
  external?: boolean;
  icon?: React.ReactNode;
};

/**
 * Pill button with the reference site's arrow swap: on hover the trailing
 * arrow slides out to the right while a leading one slides in from the left.
 */
export function Button({ href, children, variant = "default", size = "md", className, external, icon }: Props) {
  const cls = [
    "btn",
    variant !== "default" && `btn--${variant}`,
    size === "small" && "btn--small",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const arrow = icon ?? "→";
  const inner = (
    <span className="btn__inner">
      <span className="btn__icon btn__icon--lead" aria-hidden="true">
        {arrow}
      </span>
      <span>{children}</span>
      <span className="btn__icon btn__icon--trail" aria-hidden="true">
        {arrow}
      </span>
    </span>
  );

  if (external || href.startsWith("http")) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} prefetch className={cls}>
      {inner}
    </Link>
  );
}
