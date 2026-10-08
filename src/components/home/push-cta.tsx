import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Parallax } from "@/components/motion/parallax";

export function PushCta({
  title = ["Seu futuro", "começa agora."],
  text = "Uma pré-análise mostra em poucos minutos quais caminhos existem para o seu caso. Sem compromisso, com uma advogada especialista.",
  image = "/images/cta.jpg",
}: {
  title?: string[];
  text?: string;
  image?: string;
}) {
  return (
    <section data-theme="dark" className="relative -mb-px overflow-hidden rounded-t-[8px] bg-ink text-paper md:rounded-t-[8px]" aria-label="Solicite uma pré-análise">
      <Parallax className="absolute inset-0" amount={10}>
        <Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-55" />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/45 to-ink-deep/85" aria-hidden="true" />
      <div className="container-x relative flex min-h-svh flex-col items-center justify-center py-32 text-center">
        <SplitReveal as="h2" className="display-lg" stagger={0.09}>
          {title.map((line, i) => (
            <span key={line} className="block">
              {i === title.length - 1 ? <em>{line}</em> : line}
            </span>
          ))}
        </SplitReveal>
        <p className="body-lg mt-10 max-w-[40ch] text-white/80">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <Button href="/pre-analise" variant="gold">
            Solicitar pré-análise
          </Button>
          <Button href="/contato" variant="glass">
            Falar com a advogada
          </Button>
        </div>
      </div>
    </section>
  );
}
