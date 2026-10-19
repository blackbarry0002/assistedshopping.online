import type { Metadata } from "next";
import Link from "next/link";
import { ctaLabels } from "@/config/site";
import { PhoneCTA } from "@/components/PhoneCTA";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Container className="py-24 sm:py-32">
      <p className="font-mono text-xs font-medium tracking-[0.16em] text-accent uppercase">Error 404</p>
      <h1 className="mt-4 max-w-2xl text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-fg sm:text-5xl">
        This aisle is empty.
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
        The page you were looking for doesn&apos;t exist or has moved. Here are some places to start:
      </p>
      <ul className="mt-8 flex flex-wrap gap-3">
        {[
          ["Home", "/"],
          ["Services", "/#services"],
          ["How it works", "/#how-it-works"],
          ["FAQ", "/#faq"],
          ["Contact", "/contact"],
        ].map(([label, href]) => (
          <li key={href}>
            <Link
              href={href}
              className="inline-flex min-h-11 items-center rounded-lg border border-line-strong px-4 text-fg hover:border-accent"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-12 border-t border-line pt-10">
        <p className="mb-4 text-muted">Or skip the searching and talk to a person:</p>
        <PhoneCTA ctaId="404" label={ctaLabels.primary} showNumber note />
      </div>
    </Container>
  );
}
