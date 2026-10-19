import { BadgeInfo, ReceiptText } from "lucide-react";
import { disclosures } from "@/config/site";

/**
 * The two disclosures that must stay near every major call action:
 * the service is paid, and it is independent of any retailer.
 */
export function IndependenceDisclosure({
  paid = disclosures.paid,
  independent = disclosures.independent,
  className = "",
  tone = "default",
}: {
  paid?: string;
  independent?: string;
  className?: string;
  tone?: "default" | "compact";
}) {
  const text = tone === "compact" ? "text-[0.8125rem]" : "text-sm";
  return (
    <ul className={`grid gap-2.5 ${text} leading-relaxed text-muted ${className}`}>
      <li className="flex gap-2.5">
        <ReceiptText aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <span>
          <strong className="font-semibold text-fg">Paid service. </strong>
          {paid}
        </span>
      </li>
      <li className="flex gap-2.5">
        <BadgeInfo aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <span>
          <strong className="font-semibold text-fg">Independent. </strong>
          {independent.replace(/^Independent service\.\s*/, "")}
        </span>
      </li>
    </ul>
  );
}
