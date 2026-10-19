import Link from "next/link";
import { faqs } from "@/content/faq";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { FAQAccordion } from "./FAQAccordion";

export function FAQSection() {
  // FAQPage structured data mirrors the visible answers exactly.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line bg-surface/40 py-20 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading index="07" eyebrow="FAQ" id="faq-title" title="Straight answers." />
            <p className="mt-5 leading-relaxed text-muted">
              Can&apos;t find what you need? Read{" "}
              <Link href="/about" className="text-accent underline underline-offset-4">
                about our service
              </Link>{" "}
              or{" "}
              <Link href="/contact" className="text-accent underline underline-offset-4">
                send us a question
              </Link>
              .
            </p>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </section>
  );
}
