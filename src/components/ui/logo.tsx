/** Wordmark set in type, echoing the reference "BOLD regular | MONOGRAM" lockup. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[15px] leading-none tracking-[0.04em] uppercase ${className ?? ""}`}>
      {!compact && (
        <span className="whitespace-nowrap">
          <span className="font-bold">Andressa</span>
          <span className="font-normal">Ceccon</span>
        </span>
      )}
      {!compact && <span className="h-[14px] w-px bg-current opacity-60" aria-hidden="true" />}
      <span className="font-bold tracking-[-0.02em]">AC</span>
    </span>
  );
}
