import { phone } from "@/config/site";

/**
 * Shown while `phone.isPlaceholder` is true so nobody mistakes the preview
 * number for a working line. Disappears automatically once a real, verified
 * number is configured in `src/config/site.ts`.
 */
export function PlaceholderNotice() {
  if (!phone.isPlaceholder) return null;
  return (
    <div className="border-b border-review/30 bg-[#1c1606] text-[0.8125rem] text-review">
      <p className="mx-auto max-w-[1200px] px-4 py-2 text-center sm:px-6 lg:px-8">
        <strong className="font-semibold">Preview site:</strong> the phone number{" "}
        {phone.display} is a placeholder and is not yet in service.
      </p>
    </div>
  );
}
