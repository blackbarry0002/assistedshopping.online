"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/faq";

/**
 * WAI-ARIA accordion: each question is a heading containing a button that
 * controls a region. Multiple panels may be open at once.
 */
export function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const baseId = useId();

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const btnId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-[1.0625rem] font-medium text-fg transition-colors hover:text-accent sm:text-lg"
              >
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-[transform,border-color] duration-200 ${
                    isOpen ? "rotate-45 border-accent text-accent" : "border-line-strong text-muted"
                  }`}
                >
                  <Plus className="h-4 w-4" strokeWidth={2.25} />
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen}>
              <p className="max-w-3xl pr-12 pb-6 leading-relaxed text-muted">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
