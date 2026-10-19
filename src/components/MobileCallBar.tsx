import { Phone } from "lucide-react";
import { ctaLabels, phone, telHref } from "@/config/site";

/**
 * Persistent bottom call bar on small screens. The root layout adds matching
 * bottom padding to <body> so this never covers content or the footer
 * disclosures, and it respects the iOS home-indicator safe area.
 */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ink/95 px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <a
        href={telHref}
        data-cta="mobile-bar"
        className="flex min-h-13 items-center justify-between gap-2 rounded-lg bg-accent pr-3.5 pl-2.5 text-black"
      >
        <span className="flex items-center gap-3">
          <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-full bg-black/15">
            <Phone className="h-4 w-4" strokeWidth={2.4} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[0.9375rem] font-semibold whitespace-nowrap">{ctaLabels.mobileBar}</span>
            <span className="text-xs font-medium text-black/75">Paid, independent service</span>
          </span>
        </span>
        <span className="font-mono text-xs font-semibold whitespace-nowrap">{phone.display}</span>
      </a>
    </div>
  );
}
