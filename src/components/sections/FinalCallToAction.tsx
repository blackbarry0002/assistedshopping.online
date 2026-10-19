import Link from "next/link";
import { ctaLabels, disclosures } from "@/config/site";
import { IndependenceDisclosure } from "../IndependenceDisclosure";
import { PhoneCTA } from "../PhoneCTA";
import { Container } from "../ui/Container";

export function FinalCallToAction() {
  return (
    <section aria-labelledby="final-title" className="border-t border-line py-20 lg:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
          <div aria-hidden="true" className="h-1.5 bg-accent" />
          <div aria-hidden="true" className="bg-grid absolute inset-0 top-1.5 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
          <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:p-14">
            <div>
              <h2
                id="final-title"
                className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-fg sm:text-5xl lg:text-[3.5rem]"
              >
                Let&apos;s make your next shopping decision easier.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Whether you&apos;re comparing products, looking for a specific part, or planning a
                home project, start by telling us what you need.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <PhoneCTA ctaId="final" label={ctaLabels.primary} showNumber fullWidth />
              <IndependenceDisclosure
                tone="compact"
                paid={disclosures.paidShort.replace(/^Independent paid assistance\.\s*/, "")}
                independent={disclosures.independentShort}
              />
              <p className="text-sm text-muted">
                Can&apos;t call right now?{" "}
                <Link href="/contact" className="text-fg underline underline-offset-4 hover:text-accent">
                  Send a short request instead
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
