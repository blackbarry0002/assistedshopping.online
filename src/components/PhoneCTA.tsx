import { Phone } from "lucide-react";
import { ctaLabels, disclosures, phone, telHref } from "@/config/site";

type Variant = "primary" | "secondary" | "compact";

const base =
  "group inline-flex items-center justify-center gap-3 rounded-lg font-semibold transition-colors duration-150 focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary:
    "min-h-14 bg-accent px-6 py-3 text-base text-black hover:bg-accent-hover active:bg-accent-hover sm:text-[1.0625rem]",
  secondary:
    "min-h-12 border border-line-strong bg-surface px-5 py-2.5 text-[0.9375rem] text-fg hover:border-accent hover:bg-surface-2",
  compact:
    "min-h-10 bg-accent px-3.5 py-2 text-sm text-black hover:bg-accent-hover",
};

/**
 * The single reusable call-to-action. Every phone link on the site is
 * rendered by this component and reads the number from `@/config/site`.
 *
 * - `label`     action-oriented text, defaults to the primary CTA label
 * - `showNumber` renders the configured number inside the button
 * - `note`      adds the paid-service note under the button
 * - `ctaId`     analytics identifier for where the click came from
 */
export function PhoneCTA({
  label = ctaLabels.primary,
  variant = "primary",
  showNumber = false,
  note = false,
  fullWidth = false,
  ctaId,
  className = "",
}: {
  label?: string;
  variant?: Variant;
  showNumber?: boolean;
  note?: boolean | string;
  fullWidth?: boolean;
  ctaId: string;
  className?: string;
}) {
  const isAccent = variant !== "secondary";
  return (
    <div className={`${fullWidth ? "w-full" : "inline-flex"} flex-col gap-3 ${className}`}>
      <a
        href={telHref}
        data-cta={ctaId}
        className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""}`}
      >
        <span
          aria-hidden="true"
          className={`grid shrink-0 place-items-center rounded-full ${
            variant === "compact" ? "h-6 w-6" : "h-8 w-8"
          } ${isAccent ? "bg-black/15" : "bg-accent text-black"}`}
        >
          <Phone className={variant === "compact" ? "h-3.5 w-3.5" : "h-4 w-4"} strokeWidth={2.4} />
        </span>
        <span className="flex flex-col items-start text-left leading-tight">
          <span>{label}</span>
          {showNumber && (
            <span
              className={`mt-0.5 font-mono text-[0.8125rem] font-medium tracking-wide ${
                isAccent ? "text-black/75" : "text-muted"
              }`}
            >
              {phone.display}
            </span>
          )}
        </span>
        <span className="sr-only"> — starts a phone call. {disclosures.paidShort}</span>
      </a>
      {note && (
        <p className="max-w-md text-sm leading-relaxed text-muted">
          {typeof note === "string" ? note : disclosures.paid}
        </p>
      )}
    </div>
  );
}

/** Plain-text clickable number for places where a full button is too heavy. */
export function PhoneNumberLink({
  ctaId,
  className = "",
}: {
  ctaId: string;
  className?: string;
}) {
  return (
    <a
      href={telHref}
      data-cta={ctaId}
      className={`inline-flex items-center gap-2 font-mono font-medium tracking-wide text-fg underline-offset-4 hover:text-accent hover:underline ${className}`}
    >
      <Phone aria-hidden="true" className="h-4 w-4 text-accent" strokeWidth={2.2} />
      {phone.display}
    </a>
  );
}
