import { Boxes, Check, GitCompareArrows, Hammer, ScanSearch } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ctaLabels, disclosures, services } from "@/config/site";
import type { ServiceIcon } from "@/config/site";
import { PhoneCTA } from "../PhoneCTA";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

const icons: Record<ServiceIcon, LucideIcon> = {
  compare: GitCompareArrows,
  home: Hammer,
  bulk: Boxes,
  search: ScanSearch,
};

export function ServiceCategoryCards() {
  return (
    <section id="services" aria-labelledby="services-title" className="border-t border-line bg-surface/40 py-20 lg:py-28">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Services"
          id="services-title"
          title="Where a second opinion helps most."
          intro="Each request is scoped on the call, so you know what you'll receive before any paid work begins."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <article
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-title`}
                className="group flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 transition-colors hover:border-line-strong sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-lg border border-line bg-surface-2 text-accent">
                    <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <span aria-hidden="true" className="font-mono text-xs text-subtle">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 id={`${s.id}-title`} className="mt-6 text-xl font-semibold tracking-[-0.015em] text-fg sm:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{s.description}</p>

                <h4 className="mt-6 font-mono text-xs font-medium tracking-[0.12em] text-subtle uppercase">
                  What you can receive
                </h4>
                <ul className="mt-3 grid gap-2 text-[0.9375rem] text-fg sm:grid-cols-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-2.5">
                      <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 border-t border-line pt-5 text-sm text-muted">
                  <span className="font-semibold text-fg">When to call: </span>
                  {s.whenToCall}
                </p>
                <div className="mt-auto pt-5">
                  <PhoneCTA ctaId={`service-${s.id}`} label={s.cta} variant="secondary" />
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-subtle">{disclosures.verify}</p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <PhoneCTA ctaId="services" label={ctaLabels.choose} />
          <p className="text-sm text-muted sm:max-w-xs">{disclosures.paidShort}</p>
        </div>
      </Container>
    </section>
  );
}
