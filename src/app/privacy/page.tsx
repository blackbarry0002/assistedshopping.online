import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { ReviewNote } from "@/components/ui/ReviewNote";
import { business, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects information.`,
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="What information we collect when you contact us, why we collect it, and the choices you have."
      lastUpdated={null}
    >
      <h2>Who this policy covers</h2>
      <p>
        This policy describes how {site.name}, owned and operated by {business.legalName}
        {business.mailingAddress ? `, based in ${business.mailingAddress}` : ""} (&ldquo;we,&rdquo;
        &ldquo;us&rdquo;), handles information when you visit {site.domain}, call us, or send us a
        request.
      </p>
      {!business.email && (
        <ReviewNote>Add a written contact method (email) for privacy requests.</ReviewNote>
      )}

      <h2>Information we collect</h2>
      <h3>Information you give us</h3>
      <ul>
        <li>Your name and the phone number or email address you use to contact us.</li>
        <li>A description of what you&apos;re shopping for and any product details you choose to share.</li>
        <li>Notes from consultations needed to deliver the agreed service.</li>
      </ul>
      <h3>Information we do not want</h3>
      <p>
        <strong>
          Do not send us retailer passwords, one-time passcodes, account numbers, payment card
          numbers, or card security codes.
        </strong>{" "}
        We do not need them to provide our service and will never ask for them.
      </p>
      <h3>Information collected automatically</h3>
      <p>
        Like most websites, our hosting provider may log basic technical data such as IP address,
        browser type, and pages requested.
      </p>
      <h3>Google Ads tag and cookies</h3>
      <p>
        We use the Google tag (gtag.js) from Google Ads to measure how our advertising performs.
        It uses cookies and similar technologies to collect information such as the pages you
        visit, the ad that brought you here, and whether you clicked a call button. It does not
        record the content or outcome of any phone call. Google processes this information under
        its own privacy policy. You can manage ad personalization in your Google account&apos;s ad
        settings or block cookies in your browser.
      </p>
      <ReviewNote>
        List the hosting provider, form-handling service (if any), call
        tracking or call-recording practices (if any), and payment processor used for service fees.
        If calls are recorded, state this here and announce it at the start of each call as
        required by applicable state law.
      </ReviewNote>

      <h2>How we use information</h2>
      <ul>
        <li>To respond to your inquiry and explain our service and pricing.</li>
        <li>To deliver the research or other service you agree to.</li>
        <li>To keep records needed for billing, refunds, and legal obligations.</li>
        <li>To maintain and improve the website and protect it from abuse.</li>
      </ul>
      <p>We do not sell your personal information for money.</p>
      <ReviewNote>
        Because the site uses the Google Ads tag, some state privacy laws (for example
        California&apos;s) may treat ad-cookie data as &ldquo;sharing&rdquo; for cross-context
        behavioral advertising. Confirm with counsel whether an opt-out link (&ldquo;Do Not Sell or
        Share My Personal Information&rdquo;) or a cookie-consent banner is required.
      </ReviewNote>

      <h2>Sharing</h2>
      <p>
        We share information only with service providers who help us operate the business (for
        example, hosting or payment processing), when required by law, or with your permission.
      </p>

      <h2>Retention</h2>
      <ReviewNote>State how long inquiry and consultation records are kept.</ReviewNote>

      <h2>Your choices and rights</h2>
      <p>
        You can ask us to access, correct, or delete information we hold about you. Depending on
        where you live, you may have additional rights under state privacy laws.
      </p>
      <ReviewNote>
        Review applicability of state privacy laws (for example California, Colorado, Virginia,
        and others) and describe how requests are submitted and verified.
      </ReviewNote>

      <h2>Children</h2>
      <p>Our service is intended for adults and is not directed to children under 13.</p>

      <h2>Changes</h2>
      <p>
        We may update this policy. The &ldquo;Last updated&rdquo; date above will change when we
        do. Questions? See our <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
