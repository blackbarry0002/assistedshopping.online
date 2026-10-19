"use client";

import { useEffect, useRef } from "react";
import { BadgeInfo, Check, ReceiptText, X } from "lucide-react";
import { ctaLabels, disclosures, popup } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { PhoneCTA } from "./PhoneCTA";

const SEEN_KEY = "as:call-popup-seen";

const painPoints = [
  {
    pain: "Too many similar options?",
    fix: "We'll help narrow them to a shortlist that fits your budget and needs.",
  },
  {
    pain: "Can't find the right part?",
    fix: "Share the details you have and we'll research possible matches.",
  },
  {
    pain: "Not sure what's worth it?",
    fix: "We'll compare features and published offers with you, in plain language.",
  },
];

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* storage blocked — the pop-up may show again, which is harmless */
  }
}

/**
 * Call-to-action pop-up shown once per browser session (sessionStorage),
 * after the visitor has had time to read the page (`popup.delayMs`). The
 * delay keeps running across page navigations within the app, and the
 * pop-up is skipped if the visitor has already tapped a call button. Uses the native <dialog> element, so
 * focus is moved into it and trapped, Escape closes it, and focus returns
 * to the page afterwards. Clicking the backdrop or "Not now" also closes it.
 *
 * Content rules: no invented discounts, "free" claims, countdowns, or
 * availability promises — the honest offer is that price and scope are
 * explained before any paid work begins.
 */
export function CallPopup() {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!popup.enabled || alreadySeen()) return;

    const show = () => {
      const dialog = ref.current;
      if (!dialog || dialog.open || alreadySeen()) return;
      dialog.showModal();
      markSeen();
      trackEvent("cta_popup_shown");
    };

    // If the tab is in the background when the delay ends, wait until the
    // visitor comes back rather than greeting them with a pop-up.
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        document.removeEventListener("visibilitychange", onVisible);
        show();
      }
    };

    const timer = window.setTimeout(() => {
      if (document.visibilityState === "visible") show();
      else document.addEventListener("visibilitychange", onVisible);
    }, popup.delayMs);

    // Someone who already tapped a call button doesn't need the pop-up.
    const onCtaClick = () => {
      markSeen();
      window.clearTimeout(timer);
    };
    window.addEventListener("as:cta-click", onCtaClick);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("as:cta-click", onCtaClick);
    };
  }, []);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-labelledby="call-popup-title"
      aria-describedby="call-popup-desc"
      onClick={(e) => {
        // A click on the backdrop targets the <dialog> element itself.
        if (e.target === e.currentTarget) close();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-lg overflow-visible bg-transparent p-0 text-fg backdrop:bg-black/75 backdrop:backdrop-blur-sm open:motion-safe:animate-[popup-in_220ms_ease-out]"
    >
      <div className="relative max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[var(--radius-card)] border border-line-strong bg-surface shadow-[0_40px_120px_-30px_rgba(0,0,0,0.95)]">
        <div aria-hidden="true" className="h-1.5 bg-accent" />
        <button
          type="button"
          onClick={close}
          className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
        >
          <X aria-hidden="true" className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        <div className="p-5 sm:p-8">
          <p className="pr-12 font-mono text-xs font-medium tracking-[0.14em] text-accent uppercase">
            Real-person shopping help
          </p>
          <h2
            id="call-popup-title"
            className="mt-2 pr-8 text-2xl leading-[1.1] sm:mt-3 sm:text-3xl font-semibold tracking-[-0.025em] text-balance"
          >
            Stuck deciding what to buy?
          </h2>
          <p id="call-popup-desc" className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted sm:mt-3 sm:text-base">
            Call and tell us what you&apos;re shopping for. We&apos;ll explain how we can help and
            what it costs before any paid work begins — no obligation to ask.
          </p>

          <ul className="mt-4 grid gap-2.5 sm:mt-6 sm:gap-3">
            {painPoints.map((p) => (
              <li key={p.pain} className="flex gap-2.5 sm:gap-3 sm:rounded-lg sm:border sm:border-line sm:bg-ink/60 sm:p-3.5">
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent sm:h-5 sm:w-5" strokeWidth={2.75} />
                <p className="text-sm leading-snug sm:text-[0.9375rem]">
                  <span className="font-semibold text-fg">{p.pain}</span>{" "}
                  <span className="text-muted">{p.fix}</span>
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-5 sm:mt-6">
            <PhoneCTA ctaId="popup" label={ctaLabels.primary} showNumber fullWidth />
          </div>

          <ul className="mt-4 grid gap-1.5 text-xs sm:mt-5 sm:gap-2 sm:text-[0.8125rem] leading-relaxed text-muted">
            <li className="flex gap-2">
              <ReceiptText aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>
                <strong className="font-semibold text-fg">Paid service.</strong> Scope and price are
                explained and agreed before work starts.
              </span>
            </li>
            <li className="flex gap-2">
              <BadgeInfo aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{disclosures.independent}</span>
            </li>
          </ul>

          <button
            type="button"
            onClick={close}
            className="mt-3 w-full rounded-lg py-2.5 text-sm sm:mt-5 text-muted underline-offset-4 hover:text-fg hover:underline"
          >
            Not now, keep browsing
          </button>
        </div>
      </div>
    </dialog>
  );
}
