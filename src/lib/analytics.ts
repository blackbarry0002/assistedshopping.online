/**
 * Privacy-conscious CTA click tracking.
 *
 * This only records that a call button was *clicked* and where on the page
 * it was. A click is NOT a completed call — the browser hands the number to
 * the device dialer and we have no way of knowing what happens next. Never
 * report CTA clicks as "calls" in dashboards or marketing claims.
 *
 * No personal data is collected here. If the Google tag is loaded (see
 * `src/components/GoogleTag.tsx`), the click is sent as a gtag event named
 * `cta_call_click`. A DOM event is also dispatched for any custom listener.
 *
 * To count these clicks as a Google Ads conversion, create a conversion
 * action in Google Ads and add its send_to label in `CONVERSION_SEND_TO`.
 * Label it as a "call button click", never as a completed call.
 */
const CONVERSION_SEND_TO: string | null = null; // e.g. "AW-18430161458/AbCdEfGhIjk"

export type CtaClickEvent = {
  event: "cta_call_click";
  cta_id: string;
  page_path: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Send a named, non-personal event to the Google tag if it is loaded. */
export function trackEvent(name: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, { page_path: window.location.pathname, ...params });
}

export function trackCtaClick(ctaId: string) {
  if (typeof window === "undefined") return;
  const payload: CtaClickEvent = {
    event: "cta_call_click",
    cta_id: ctaId,
    page_path: window.location.pathname,
  };
  if (typeof window.gtag === "function") {
    window.gtag("event", "cta_call_click", { cta_id: ctaId, page_path: payload.page_path });
    if (CONVERSION_SEND_TO) window.gtag("event", "conversion", { send_to: CONVERSION_SEND_TO });
  }
  window.dispatchEvent(new CustomEvent("as:cta-click", { detail: payload }));
}
