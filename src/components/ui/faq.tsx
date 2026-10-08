export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-black/10">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-black/10">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <span className="text-[clamp(18px,1.4vw,22px)] leading-[1.2] font-medium tracking-[-0.02em]">{item.q}</span>
            <span
              aria-hidden="true"
              className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-black/[0.06] text-lg leading-none transition-transform duration-500 ease-[var(--ease-out-expo)] group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="body-lg max-w-[60ch] pb-7 text-[#3a3a3a]">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
