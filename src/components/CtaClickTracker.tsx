"use client";

import { useEffect } from "react";
import { trackCtaClick } from "@/lib/analytics";

/**
 * One delegated listener for every `a[data-cta]` on the page, so the phone
 * CTAs themselves can stay server-rendered.
 */
export function CtaClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>("a[data-cta]");
      if (link) trackCtaClick(link.dataset.cta ?? "unknown");
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
