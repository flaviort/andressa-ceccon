import { Footer } from "@/components/layout/footer";
import { SheetTransition } from "@/components/motion/sheet-transition";

/**
 * Wraps every page so route changes run the "sheet" transition defined in
 * globals.css. It lives in each page, not the layout, because layouts persist
 * across navigations and would never fire enter or exit.
 */
export function PageTransition({
  children,
  footer = true,
}: {
  children: React.ReactNode;
  footer?: boolean;
}) {
  return (
    <SheetTransition>
      <div className="relative bg-paper">
        <main id="conteudo">{children}</main>
        {footer && <Footer />}
      </div>
    </SheetTransition>
  );
}
