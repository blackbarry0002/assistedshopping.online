import { features } from "@/config/site";

/**
 * Placeholder for real customer feedback.
 *
 * Hidden by default (`features.showTestimonials = false`). Only enable it
 * once you have genuine feedback AND written permission to publish it.
 * Never add invented quotes, star ratings, review-platform badges, or
 * customer counts.
 */
export type Testimonial = { quote: string; attribution: string };

const testimonials: Testimonial[] = [];

export function Testimonials() {
  if (!features.showTestimonials || testimonials.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-title" className="border-t border-line py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <h2 id="testimonials-title" className="text-3xl font-semibold text-fg">
          From people we&apos;ve helped
        </h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.attribution} className="rounded-[var(--radius-card)] border border-line bg-surface p-6">
              <blockquote className="leading-relaxed text-fg">“{t.quote}”</blockquote>
              <p className="mt-4 text-sm text-muted">— {t.attribution}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
