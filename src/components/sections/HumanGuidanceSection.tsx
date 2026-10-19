import { CircleCheck } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

const steps = [
  {
    title: "Tell us what you need",
    body: "Call and describe the product, part, project, or shopping decision you're working through.",
  },
  {
    title: "Discuss your options",
    body: "A human assistant helps clarify your requirements and research relevant options within the agreed service scope.",
  },
  {
    title: "Make an informed choice",
    body: "Receive practical guidance so you can decide what to purchase and complete the transaction directly with the seller.",
  },
];

const reassurances = [
  "You make the final purchasing decision.",
  "You buy directly from your chosen seller.",
  "We explain the paid service before work begins.",
  "We never need your retailer password, one-time passcode, or payment credentials.",
];

export function HumanGuidanceSection() {
  return (
    <section aria-labelledby="human-title" className="border-t border-line py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              index="03"
              eyebrow="The human difference"
              id="human-title"
              title={
                <>
                  Real guidance. Your questions.{" "}
                  <span className="text-accent">Your decision.</span>
                </>
              }
              intro="Some shopping decisions need more than a list of search results. Our service gives you a way to explain what you need, ask questions, and work through your options with human assistance."
            />

            <div className="mt-10 rounded-[var(--radius-card)] border border-ok/25 bg-ok-soft/60 p-6">
              <h3 className="text-sm font-semibold text-fg">You stay in control</h3>
              <ul className="mt-4 grid gap-3">
                {reassurances.map((r) => (
                  <li key={r} className="flex gap-3 text-[0.9375rem] leading-relaxed text-fg">
                    <CircleCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-ok" strokeWidth={2} />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ol className="relative grid content-start gap-0">
            {steps.map((s, i) => (
              <li key={s.title} className="relative grid grid-cols-[3.5rem_1fr] gap-5 pb-10 last:pb-0">
                {i < steps.length - 1 && (
                  <span aria-hidden="true" className="absolute top-14 bottom-0 left-7 w-px bg-line" />
                )}
                <span
                  aria-hidden="true"
                  className="grid h-14 w-14 place-items-center rounded-full border border-line-strong bg-surface font-mono text-lg font-semibold text-accent"
                >
                  {i + 1}
                </span>
                <div className="pt-2.5">
                  <h3 className="text-xl font-semibold tracking-[-0.015em] text-fg">
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
