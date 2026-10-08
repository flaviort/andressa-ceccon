import { PageTransition } from "@/components/motion/page-transition";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageTransition>
      <section className="container-x flex min-h-svh flex-col justify-end pt-[var(--header-h)] pb-16">
        <p className="label-mono text-ash">Erro 404</p>
        <h1 className="display-xl mt-6">
          Página
          <br />
          <em>não encontrada.</em>
        </h1>
        <div className="mt-10 flex flex-wrap gap-2">
          <Button href="/" variant="dark">
            Voltar ao início
          </Button>
          <Button href="/servicos">Ver serviços</Button>
        </div>
      </section>
    </PageTransition>
  );
}
