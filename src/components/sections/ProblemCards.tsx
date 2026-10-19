import { Layers3, MessagesSquare, PackageSearch, Scale } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ctaLabels } from "@/config/site";
import { PhoneCTA } from "../PhoneCTA";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

const problems: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Too many choices",
    icon: Layers3,
    body: "Dozens of similar products, confusing specifications, and conflicting recommendations make it difficult to know which option suits you.",
  },
  {
    title: "Can't find the right item",
    icon: PackageSearch,
    body: "Need a particular part, compatible accessory, or product for a specific project? Start with someone who can help narrow the search.",
  },
  {
    title: "Unsure what offers real value",
    icon: Scale,
    body: "Compare available options, understand published offers, and evaluate the features that matter to your budget and needs.",
  },
  {
    title: "Prefer speaking to a person",
    icon: MessagesSquare,
    body: "Explain what you're trying to accomplish in your own words and get personalized guidance instead of relying entirely on automated recommendations.",
  },
];

export function ProblemCards() {
  return (
    <section aria-labelledby="problem-title" className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          index="01"
          eyebrow="The problem"
          id="problem-title"
          title="Shopping shouldn't feel this complicated."
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {problems.map(({ title, body, icon: Icon }) => (
            <li key={title} className="flex flex-col bg-surface p-6 lg:p-7">
              <Icon aria-hidden="true" className="h-7 w-7 text-accent" strokeWidth={1.75} />
              <h3 className="mt-6 text-lg font-semibold tracking-[-0.01em] text-fg">{title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[var(--radius-card)] border border-line bg-ink p-6 sm:p-8 lg:flex-row lg:items-center">
          <p className="max-w-xl text-xl leading-snug font-medium tracking-[-0.01em] text-balance text-fg sm:text-2xl">
            Tell us what you&apos;re trying to buy.{" "}
            <span className="text-muted">We&apos;ll help you work through the options.</span>
          </p>
          <PhoneCTA ctaId="problem-bridge" label={ctaLabels.assistant} note={false} className="shrink-0" />
        </div>
      </Container>
    </section>
  );
}
