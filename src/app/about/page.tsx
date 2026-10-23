import type { Metadata } from "next";
import Link from "next/link";
import { business, ctaLabels, disclosures, site } from "@/config/site";
import { IndependenceDisclosure } from "@/components/IndependenceDisclosure";
import { PhoneCTA } from "@/components/PhoneCTA";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ReviewNote } from "@/components/ui/ReviewNote";

export const metadata: Metadata = {
  title: "About Our Independent Shopping Service",
  description:
    "Assisted Shopping is an independent, paid, human-led shopping service. Learn what we do, what we don't do, and how we work with customers.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A human-led shopping service that works for you — not for a store."
        intro={site.promise}
      />
      <Container className="py-14 sm:py-16">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_0.9fr] lg:gap-20">
          <div className="prose-legal max-w-none">
            <h2 className="!mt-0">What we do</h2>
            <p>
              {site.name} helps people in the {site.market} work through shopping decisions that
              have become confusing: comparing similar products, finding a specific part, building a
              shopping list for a home project, or understanding publicly available membership and
              bulk-buying offers.
            </p>
            <p>
              You call, explain what you&apos;re trying to accomplish in your own words, and a person
              helps you clarify what matters and research the options — within a scope and price
              you agree to before any paid work begins.
            </p>

            <h2>Why we&apos;re independent</h2>
            <p>
              We are not a retailer, marketplace, manufacturer, or warehouse club, and we are not the
              customer service department of any company. We do not receive instructions from
              sellers about what to recommend.
            </p>
            <ReviewNote>
              Confirm whether the business earns any affiliate commissions, referral fees, or other
              compensation from sellers. If it does, disclose that here clearly and conspicuously
              (FTC Endorsement Guides). If it does not, this note can be replaced with a statement
              saying so.
            </ReviewNote>

            <h2>What we can and can&apos;t do</h2>
            <h3>We can</h3>
            <ul>
              <li>Research and compare products against your budget, features, and intended use.</li>
              <li>Explain specifications and suggest questions to ask before buying.</li>
              <li>Build project shopping lists and identify compatibility details to verify.</li>
              <li>Explain published membership terms and compare publicly available offers.</li>
            </ul>
            <h3>We can&apos;t</h3>
            <ul>
              <li>
                Access, manage, or change your retailer accounts, orders, refunds, memberships,
                payments, or warranties. For those, contact the retailer directly.
              </li>
              <li>Guarantee prices, discounts, availability, compatibility, or savings.</li>
              <li>Speak or act on behalf of any retailer or manufacturer.</li>
            </ul>

            <h2>Full independence disclaimer</h2>
            <p>
              {site.name} is an independent, paid shopping-assistance service. We are not
              affiliated with, authorized by, sponsored by, or endorsed by any retailer, marketplace,
              warehouse club, or manufacturer. Any product names, brand names, or trademarks
              discussed during a consultation belong to their respective owners and are referred to
              only to describe or compare products.
            </p>
            <p>
              Our guidance is based on the information you provide and on publicly available product
              information at the time of research. Product availability, final pricing, warranties,
              shipping, returns, and purchase fulfillment are controlled by the seller and subject to
              the seller&apos;s terms. {disclosures.noCredentials}
            </p>

            <h2>Who we are</h2>
            {business.legalName ? (
              <p>
                {site.name} is owned and operated by {business.legalName}
                {business.mailingAddress ? `, based in ${business.mailingAddress}` : ""}.
              </p>
            ) : (
              <ReviewNote>
                Add the legal business name, state of organization, and how customers can reach the
                business in writing. Do not publish details that have not been confirmed.
              </ReviewNote>
            )}
            <p>
              See our <Link href="/terms">Terms of Service</Link>,{" "}
              <Link href="/privacy">Privacy Policy</Link>, and{" "}
              <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link>.
            </p>
          </div>

          <aside className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:p-8">
              <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg">Talk it through</h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                Tell us what you&apos;re shopping for. We&apos;ll explain whether we can help and
                what it costs before any paid work begins.
              </p>
              <PhoneCTA ctaId="about" label={ctaLabels.assistant} showNumber fullWidth className="mt-6" />
              <IndependenceDisclosure tone="compact" className="mt-6" />
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
