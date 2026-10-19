import type { ReactNode } from "react";

/**
 * Section heading with a numbered mono eyebrow, e.g. "02 — Services".
 * The index reads like an aisle marker and gives the long page a clear spine.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  id,
  intro,
  align = "left",
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  id?: string;
  intro?: ReactNode;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      <p
        className={`flex items-center gap-3 font-mono text-xs font-medium tracking-[0.14em] text-accent uppercase ${
          centered ? "justify-center" : ""
        }`}
      >
        {index && (
          <>
            <span aria-hidden="true">{index}</span>
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          </>
        )}
        <span>{eyebrow}</span>
      </p>
      <h2
        id={id}
        className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-balance text-fg sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-5 text-lg leading-relaxed text-pretty text-muted">{intro}</p>
      )}
    </div>
  );
}
