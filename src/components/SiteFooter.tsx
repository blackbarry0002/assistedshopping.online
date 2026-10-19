import Link from "next/link";
import {
  business,
  companyLinks,
  disclosures,
  legalLinks,
  services,
  site,
} from "@/config/site";
import { Wordmark } from "./Logo";
import { PhoneNumberLink } from "./PhoneCTA";
import { Container } from "./ui/Container";

function FooterList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-mono text-xs font-medium tracking-[0.14em] text-subtle uppercase">
        {title}
      </h2>
      <ul className="mt-4 grid gap-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-[0.9375rem] text-muted hover:text-fg hover:underline underline-offset-4">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const serviceLinks = services.map((s) => ({ label: s.title, href: `/#${s.id}` }));
  return (
    <footer className="border-t border-line bg-ink">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_0.8fr_1fr]">
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{site.summary}</p>
            <div className="mt-6">
              <PhoneNumberLink ctaId="footer" className="text-lg" />
              <p className="mt-2 text-sm text-subtle">{disclosures.paidShort}</p>
              {business.hours && <p className="mt-1 text-sm text-subtle">{business.hours}</p>}
            </div>
          </div>
          <FooterList title="Services" links={serviceLinks} />
          <FooterList title="Company" links={companyLinks} />
          <FooterList title="Policies" links={legalLinks} />
        </div>

        <div className="mt-12 grid gap-4 border-t border-line pt-8 text-[0.8125rem] leading-relaxed text-subtle">
          <p>
            <strong className="font-semibold text-muted">Independent service. </strong>
            {site.name} is an independent, paid shopping-assistance business. We are not a
            retailer, marketplace, or manufacturer, and we are not the customer service department
            of any company. We are not affiliated with, sponsored by, or endorsed by any retailer or
            manufacturer. Product names and trademarks mentioned during a consultation belong to
            their respective owners.
          </p>
          <p>
            <strong className="font-semibold text-muted">Paid service. </strong>
            {disclosures.noObligation} {disclosures.noCredentials}
          </p>
          {business.legalName && (
            <p>
              <strong className="font-semibold text-muted">Owned and operated by </strong>
              {business.legalName}
              {business.mailingAddress ? `, ${business.mailingAddress}` : ""}.
            </p>
          )}
          <p>
            © {site.name}
            {business.legalName ? ` · ${business.legalName}` : ""}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
