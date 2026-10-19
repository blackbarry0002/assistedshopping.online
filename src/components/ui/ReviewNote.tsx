import type { ReactNode } from "react";

/**
 * Highlights business-specific details that must be supplied or reviewed
 * before launch. Search the codebase for "<ReviewNote" to find every one.
 * Remove each note once the underlying text has been confirmed.
 */
export function ReviewNote({ children }: { children: ReactNode }) {
  return (
    <span className="my-1 block rounded-md border border-dashed border-review/50 bg-[#1c1606] px-3 py-2 font-mono text-[0.8125rem] leading-relaxed text-review not-italic">
      <strong className="font-semibold">Review before launch:</strong> {children}
    </span>
  );
}
