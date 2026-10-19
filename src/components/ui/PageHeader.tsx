import type { ReactNode } from "react";
import { Container } from "./Container";

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
      <Container className="relative py-14 sm:py-20">
        <p className="font-mono text-xs font-medium tracking-[0.16em] text-accent uppercase">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-fg sm:text-5xl">
          {title}
        </h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{intro}</p>}
        {children}
      </Container>
    </section>
  );
}
