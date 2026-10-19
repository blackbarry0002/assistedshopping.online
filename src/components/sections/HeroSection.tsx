import { Check } from "lucide-react";
import { ctaLabels } from "@/config/site";
import { IndependenceDisclosure } from "../IndependenceDisclosure";
import { PhoneCTA } from "../PhoneCTA";
import { Container } from "../ui/Container";
import { HeroVisual } from "./HeroVisual";

const assurances = ["A real person", "Independent", "Price explained first"];

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line">
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <Container className="relative grid items-center gap-12 pt-10 pb-14 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-20 lg:pb-24">
        <div>
          <p className="font-mono text-xs font-medium tracking-[0.16em] text-accent uppercase">
            Independent shopping assistance
          </p>
          <h1
            id="hero-title"
            className="mt-4 text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.035em] text-balance text-fg sm:text-6xl lg:text-[4.25rem]"
          >
            Not sure what to buy? <span className="text-accent">Talk to a real person.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted sm:text-xl sm:leading-relaxed">
            Comparing products, finding the right parts, or deciding which option fits your needs
            can get overwhelming. Tell us what you&apos;re shopping for, and we&apos;ll help you
            understand your options and make a more confident decision.
          </p>

          <div className="mt-8">
            <PhoneCTA ctaId="hero" label={ctaLabels.primary} showNumber className="w-full sm:w-auto [&>a]:w-full sm:[&>a]:w-auto" />
          </div>

          <IndependenceDisclosure className="mt-6 max-w-xl" />

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-sm text-fg">
            {assurances.map((a) => (
              <li key={a} className="flex items-center gap-2">
                <Check aria-hidden="true" className="h-4 w-4 text-accent" strokeWidth={3} />
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pl-4">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
