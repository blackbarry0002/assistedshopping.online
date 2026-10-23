import type { Metadata } from "next";
import { business, ctaLabels, disclosures } from "@/config/site";
import { IndependenceDisclosure } from "@/components/IndependenceDisclosure";
import { PhoneCTA } from "@/components/PhoneCTA";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ReviewNote } from "@/components/ui/ReviewNote";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call Assisted Shopping to discuss independent, paid help with product research, comparisons, and shopping lists — or send a short request.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="The fastest way to start is a phone call."
        intro="Tell us what you're shopping for. We'll explain whether we can help, what's included, and the price — before any paid work begins."
      >
        <div className="mt-8">
          <PhoneCTA ctaId="contact-hero" label={ctaLabels.primary} showNumber note={disclosures.noObligation} />
        </div>
      </PageHeader>

      <Container className="py-14 sm:py-16">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_0.9fr] lg:gap-20">
          <section aria-labelledby="form-title">
            <h2 id="form-title" className="text-2xl font-semibold tracking-[-0.02em] text-fg">
              Can&apos;t call right now?
            </h2>
            <p className="mt-2 mb-8 leading-relaxed text-muted">
              Send a short request and we&apos;ll get back to you. A call is still the quickest way to
              get started.
            </p>
            <ServiceRequestForm />
          </section>

          <aside className="grid content-start gap-6">
            <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6">
              <h2 className="text-lg font-semibold text-fg">Before you contact us</h2>
              <IndependenceDisclosure tone="compact" className="mt-4" />
              <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-muted">
                Need help with an existing order, refund, membership, or account? Contact that
                retailer directly — we can&apos;t access or change retailer accounts.
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 text-sm leading-relaxed text-muted">
              <h2 className="text-lg font-semibold text-fg">Business details</h2>
              {business.legalName ? (
                <p className="mt-3">
                  <span className="text-fg">{business.legalName}</span>
                  {business.mailingAddress ? (
                    <>
                      <br />
                      {business.mailingAddress}
                    </>
                  ) : null}
                </p>
              ) : null}
              {business.hours ? <p className="mt-3">Hours: {business.hours}</p> : null}
              {business.email ? <p className="mt-1">Email: {business.email}</p> : null}
              {(!business.hours || !business.email) && (
                <div className="mt-3">
                  <ReviewNote>
                    Add {!business.hours ? "staffed calling hours" : ""}
                    {!business.hours && !business.email ? " and " : ""}
                    {!business.email ? "a written contact method (email)" : ""} in{" "}
                    <code>src/config/site.ts</code>. Only publish hours the business can actually
                    staff.
                  </ReviewNote>
                </div>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
