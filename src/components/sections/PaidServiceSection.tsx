import { Check, Minus } from "lucide-react";
import { ctaLabels, disclosures, site } from "@/config/site";
import { PhoneCTA } from "../PhoneCTA";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

/** Rendered as a receipt: every line is settled before anything is charged. */
const lines: { label: string; value: string; ok: boolean }[] = [
  { label: "Service scope", value: "Explained first", ok: true },
  { label: "Price", value: "Stated before work", ok: true },
  { label: "Deliverables & limits", value: "Described upfront", ok: true },
  { label: "Decision to proceed", value: "Yours", ok: true },
  { label: "Required retailer purchase", value: "None", ok: true },
  { label: "Hidden or recurring charges", value: "None", ok: true },
  { label: "Guaranteed savings or outcomes", value: "Not promised", ok: false },
];

export function PaidServiceSection() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="border-t border-line bg-surface/40 py-20 lg:py-28">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <SectionHeading
              index="04"
              eyebrow="Service fees"
              id="pricing-title"
              title="Personalized help, with clear expectations."
            />
            <p className="mt-5 text-lg leading-relaxed text-pretty text-muted">
              {site.name} provides independent, paid guidance for product research, comparisons,
              shopping lists, and related purchasing decisions. Before any paid work begins,
              we&apos;ll explain the available service, its scope, and the applicable price so you
              can decide whether to proceed.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-fg">
              Pricing depends on what you need. Call to discuss your request and the available
              service options.
            </p>
            <div className="mt-8">
              <PhoneCTA ctaId="pricing" label={ctaLabels.discuss} showNumber note={disclosures.noObligation} />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mt-4">
            <div className="rounded-t-[var(--radius-card)] border border-b-0 border-line bg-fg px-6 pt-6 pb-4 text-ink sm:px-8">
              <div className="flex items-baseline justify-between font-mono text-[0.6875rem] tracking-[0.14em] uppercase">
                <span>Before paid work</span>
                <span className="opacity-60">Checklist</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em]">What you&apos;ll know first</h3>
              <ul className="mt-5 divide-y divide-dashed divide-ink/25 border-y border-dashed border-ink/25">
                {lines.map((l) => (
                  <li key={l.label} className="flex items-center justify-between gap-4 py-3 text-[0.9375rem]">
                    <span className="flex items-center gap-2.5">
                      {l.ok ? (
                        <Check aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={3} />
                      ) : (
                        <Minus aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={3} />
                      )}
                      {l.label}
                    </span>
                    <span className="text-right font-mono text-[0.8125rem] font-semibold">{l.value}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[0.75rem] leading-relaxed opacity-70">
                Prices, offers, and availability on products are set by sellers and may change.
              </p>
            </div>
            {/* Perforated receipt edge */}
            <div
              aria-hidden="true"
              className="h-3 w-full bg-[radial-gradient(circle_at_8px_0,transparent_6px,#f7f7f7_6.5px)] bg-[length:16px_12px] bg-repeat-x"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
