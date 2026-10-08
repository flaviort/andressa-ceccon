import { ViewTransition } from "react";
import { Footer } from "@/components/layout/footer";

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
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div className="relative bg-paper">
        <main id="conteudo">{children}</main>
        {footer && <Footer />}
      </div>
    </ViewTransition>
  );
}
