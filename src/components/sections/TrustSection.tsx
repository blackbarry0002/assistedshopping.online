import { Ban, Check, ShieldCheck } from "lucide-react";
import { site } from "@/config/site";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

const weAre = [
  `${site.name} is an independent shopping-assistance business.`,
  "We provide guidance based on the agreed service and the information available.",
  "We explain the scope and price of paid work before it begins.",
];

const weAreNot = [
  "We are not the official support department of any retailer.",
  "We do not claim to represent retailers or manufacturers.",
  "We do not control product availability, final pricing, warranties, shipping, returns, or fulfillment — those remain subject to the seller's terms.",
];

export function TrustSection() {
  return (
    <section aria-labelledby="trust-title" className="border-t border-line py-20 lg:py-28">
      <Container>
        <SectionHeading
          index="06"
          eyebrow="Trust & transparency"
          id="trust-title"
          title="Independent by design. Clear about what we do."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:p-8">
            <h3 className="flex items-center gap-2.5 text-lg font-semibold text-fg">
              <Check aria-hidden="true" className="h-5 w-5 text-accent" strokeWidth={2.75} />
              What we are
            </h3>
            <ul className="mt-5 grid gap-4">
              {weAre.map((t) => (
                <li key={t} className="border-l-2 border-accent pl-4 leading-relaxed text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:p-8">
            <h3 className="flex items-center gap-2.5 text-lg font-semibold text-fg">
              <Ban aria-hidden="true" className="h-5 w-5 text-muted" strokeWidth={2.25} />
              What we are not
            </h3>
            <ul className="mt-5 grid gap-4">
              {weAreNot.map((t) => (
                <li key={t} className="border-l-2 border-line-strong pl-4 leading-relaxed text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4 rounded-[var(--radius-card)] border border-accent/40 bg-accent-soft p-6 sm:flex-row sm:items-center sm:p-8">
          <ShieldCheck aria-hidden="true" className="h-9 w-9 shrink-0 text-accent" strokeWidth={1.75} />
          <div>
            <h3 className="text-lg font-semibold text-fg">We will never ask for your passwords or codes.</h3>
            <p className="mt-1.5 leading-relaxed text-muted">
              We do not ask customers to disclose retailer passwords, one-time passcodes, or payment
              card security codes. If anyone claiming to be us asks for them, do not share them.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
