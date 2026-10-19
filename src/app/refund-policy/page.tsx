import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { ReviewNote } from "@/components/ui/ReviewNote";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: `How cancellations and refunds work for ${site.name}'s paid shopping-assistance services.`,
  alternates: { canonical: "/refund-policy/" },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      intro="How cancellations and refunds work for our paid assistance. This policy covers our service fees only — not products you buy from sellers."
      lastUpdated={null}
    >
      <h2>Before you agree to paid work</h2>
      <p>
        Asking about our service and its price is free and carries no obligation. Paid work begins
        only after the scope and price have been explained and you agree to proceed.
      </p>

      <h2>Cancelling a service</h2>
      <ReviewNote>
        Define when and how a customer can cancel (by phone, by email), and what happens to fees if
        they cancel before work starts, while work is in progress, and after the deliverable is
        provided.
      </ReviewNote>

      <h2>Refunds</h2>
      <ReviewNote>
        State the refund conditions, how to request a refund, how long refunds take, and how they
        are issued (for example, to the original payment method). Make sure this matches what
        customers are told on calls.
      </ReviewNote>

      <h2>Products you buy from sellers</h2>
      <p>
        We do not sell products. Returns, exchanges, refunds, and warranty claims for anything you
        purchase are handled by the seller or manufacturer under their policies. We cannot process
        or change them.
      </p>

      <h2>No recurring charges</h2>
      <p>Our services are not sold as subscriptions and do not renew automatically.</p>

      <h2>Questions</h2>
      <p>
        See our <Link href="/contact">contact page</Link> or our{" "}
        <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalPage>
  );
}
