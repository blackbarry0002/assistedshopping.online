import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { ReviewNote } from "@/components/ui/ReviewNote";
import { business, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms that apply to ${site.name}'s independent, paid shopping-assistance service.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="The terms that apply when you use our website or agree to paid shopping assistance."
      lastUpdated={null}
    >
      <h2>1. Who we are</h2>
      <p>
        {site.name} is an independent, paid shopping-assistance service owned and operated by{" "}
        {business.legalName}
        {business.mailingAddress ? `, located in ${business.mailingAddress}` : ""} (&ldquo;we,&rdquo;
        &ldquo;us&rdquo;). We help customers research products, compare options, and plan
        purchases.
      </p>
      <ReviewNote>
        Confirm the state where {business.legalName} is organized and add a written contact method
        (email).
      </ReviewNote>

      <h2>2. Independence</h2>
      <p>
        We are not a retailer, marketplace, manufacturer, or warehouse club, and we are not the
        customer service department of any company. We are not affiliated with, authorized by,
        sponsored by, or endorsed by any retailer or manufacturer. We cannot access, manage, or
        change your accounts, orders, refunds, memberships, payments, or warranties with any seller.
      </p>

      <h2>3. Paid services and pricing</h2>
      <p>
        Personalized assistance is a paid service. Before any paid work begins, we will describe the
        service, its scope, deliverables, limitations, and the applicable price. Paid work begins
        only after you agree. Calling us or asking questions about the service does not obligate
        you to buy anything.
      </p>
      <p>We do not enroll customers in subscriptions or automatic recurring charges.</p>
      <ReviewNote>
        Describe how the price is communicated and agreed (for example, verbally followed by a
        written confirmation), accepted payment methods, the payment processor, and when payment is
        due. Confirm there are no recurring charges; if any are ever introduced, they must comply
        with applicable automatic-renewal laws.
      </ReviewNote>

      <h2>4. Your purchases</h2>
      <p>
        You make your own purchasing decisions and buy directly from the seller you choose. Product
        availability, final pricing, warranties, shipping, returns, and fulfillment are governed by
        the seller&apos;s terms, not ours.
      </p>

      <h2>5. Nature of our guidance</h2>
      <p>
        Our guidance is based on the information you provide and publicly available information at
        the time of research. Prices, offers, specifications, and availability can change. We do not
        guarantee savings, the lowest price, any discount, product availability, compatibility, or
        suitability. Confirm important details — especially fit, compatibility, and safety
        requirements — with the seller or manufacturer before purchasing.
      </p>

      <h2>6. Information you should not share</h2>
      <p>
        Do not share retailer passwords, one-time passcodes, account credentials, payment card
        numbers, or security codes with us. We do not need them and will not ask for them.
      </p>

      <h2>7. Refunds and cancellation</h2>
      <p>
        See our <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link>.
      </p>

      <h2>8. Limitation of liability</h2>
      <ReviewNote>
        Have counsel draft limitation-of-liability, disclaimer, dispute-resolution, and governing-law
        provisions appropriate for the business and the states it serves.
      </ReviewNote>

      <h2>9. Changes to these terms</h2>
      <p>
        We may update these terms. The version in effect when you agree to a paid service applies to
        that service.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about these terms? Visit our <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
