import { ctaLabels, disclosures } from "@/config/site";
import { PhoneCTA } from "../PhoneCTA";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

const steps = [
  { title: "Call us", body: "Tell us what you're shopping for and what you're finding difficult." },
  { title: "Explain your needs", body: "We'll clarify the scope of your request and discuss whether our service can help." },
  { title: "Review the price", body: "Understand the available assistance and price before agreeing to paid work.", decision: true },
  { title: "Get your guidance", body: "Receive the agreed research, comparisons, shopping list, or other deliverable." },
  { title: "Buy with confidence", body: "Use the information to make your own decision and purchase directly from your chosen seller." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="border-t border-line py-20 lg:py-28">
      <Container>
        <SectionHeading
          index="05"
          eyebrow="How it works"
          id="how-title"
          title="Five steps. You're in control at every one."
        />

        <ol className="mt-14 grid gap-0 lg:grid-cols-5 lg:gap-6">
          {steps.map((s, i) => (
            <li key={s.title} className="relative grid grid-cols-[2.75rem_1fr] gap-4 pb-9 last:pb-0 lg:block lg:pb-0">
              {/* Connector: vertical on mobile, horizontal on desktop */}
              {i < steps.length - 1 && (
                <>
                  <span aria-hidden="true" className="absolute top-11 bottom-0 left-[1.375rem] w-px bg-line lg:hidden" />
                  <span aria-hidden="true" className="absolute top-[1.375rem] right-[-1.5rem] left-14 hidden h-px bg-line lg:block" />
                </>
              )}
              <span
                aria-hidden="true"
                className={`relative grid h-11 w-11 place-items-center rounded-full font-mono text-sm font-semibold ${
                  s.decision ? "bg-accent text-black" : "border border-line-strong bg-surface text-fg"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-1.5 lg:mt-6 lg:pt-0">
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-fg">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{s.body}</p>
                {s.decision && (
                  <p className="mt-3 inline-flex rounded-full border border-accent/40 px-2.5 py-1 font-mono text-[0.6875rem] tracking-wide text-accent uppercase">
                    You decide here
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-center">
          <PhoneCTA ctaId="how-it-works" label={ctaLabels.start} />
          <p className="text-sm text-muted sm:max-w-sm">{disclosures.paidShort}</p>
        </div>
      </Container>
    </section>
  );
}
