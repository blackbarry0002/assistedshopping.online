import { Check, Circle, UserRound } from "lucide-react";

/**
 * Original hero illustration built from HTML/CSS: a shopper's brief, a
 * side-by-side comparison, an assistant's note, and a checklist — showing a
 * conversation that leads to a decision. All products are generic and
 * fictional; there are no brands, logos, or copied screenshots.
 */
const options = [
  { name: "Option A", width: "23⅞ in", noise: "48 dBA", rack: "No", fit: false },
  { name: "Option B", width: "23¾ in", noise: "44 dBA", rack: "Yes", fit: true },
  { name: "Option C", width: "24⅛ in", noise: "42 dBA", rack: "Yes", fit: false },
];

function Tape() {
  // Measuring-tape strip with inch ticks.
  const ticks = Array.from({ length: 49 }, (_, i) => i);
  return (
    <svg viewBox="0 0 480 28" className="h-7 w-full" preserveAspectRatio="none">
      <rect width="480" height="28" fill="#FF6A00" />
      {ticks.map((i) => (
        <line
          key={i}
          x1={i * 10}
          x2={i * 10}
          y1="0"
          y2={i % 4 === 0 ? 14 : i % 2 === 0 ? 9 : 6}
          stroke="#050505"
          strokeWidth="1.2"
        />
      ))}
      {ticks
        .filter((i) => i % 8 === 0 && i > 0)
        .map((i) => (
          <text key={i} x={i * 10} y="24" fontSize="8" textAnchor="middle" fill="#050505" fontFamily="monospace">
            {i / 8}
          </text>
        ))}
    </svg>
  );
}

export function HeroVisual() {
  return (
    <div
      role="img"
      aria-label="Illustration: a shopping assistant's notes comparing three generic dishwashers against a customer's measurements, with a checklist of details to confirm with the seller."
      className="relative mx-auto w-full max-w-[520px] select-none sm:mt-14 lg:mt-0"
    >
      {/* Brief + comparison */}
      <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-subtle uppercase">
            Shopping brief
          </span>
        </div>
        <div className="px-5 pt-4 pb-5">
          <p className="text-[0.9375rem] leading-snug text-fg">
            “Quiet dishwasher for a 24-inch opening. Third rack would be nice.”
          </p>
          <div className="mt-4 overflow-hidden rounded-md border border-line">
            <div className="grid grid-cols-[1.1fr_1fr_1fr_0.8fr] bg-surface-2 px-3 py-2 font-mono text-[0.6875rem] tracking-wide text-subtle uppercase">
              <span>Model</span>
              <span>Width</span>
              <span>Noise</span>
              <span>Rack</span>
            </div>
            {options.map((o) => (
              <div
                key={o.name}
                className={`grid grid-cols-[1.1fr_1fr_1fr_0.8fr] items-center border-t border-line px-3 py-2.5 text-[0.8125rem] ${
                  o.fit ? "bg-accent-soft text-fg" : "text-muted"
                }`}
              >
                <span className="flex items-center gap-2 font-medium">
                  {o.fit ? (
                    <Check className="h-3.5 w-3.5 text-accent" strokeWidth={3} />
                  ) : (
                    <Circle className="h-3 w-3 text-line-strong" />
                  )}
                  {o.name}
                </span>
                <span className="font-mono">{o.width}</span>
                <span className="font-mono">{o.noise}</span>
                <span>{o.rack}</span>
              </div>
            ))}
          </div>
        </div>
        <Tape />
      </div>

      {/* Assistant note — the human in the loop */}
      <div className="relative z-10 -mt-6 ml-6 w-[86%] rounded-[var(--radius-card)] border border-line-strong bg-surface-2 p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] sm:ml-12">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-fg text-ink">
            <UserRound className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <div>
            <p className="text-xs font-semibold text-fg">
              Your shopping assistant
              <span className="ml-2 font-normal text-subtle">· note</span>
            </p>
            <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">
              B fits your 24″ opening and has the third rack. Before ordering, confirm cabinet depth
              and the return window with the seller.
            </p>
          </div>
        </div>
      </div>

      {/* Checklist card */}
      <div className="absolute -top-16 -right-2 z-20 hidden w-44 rotate-[2.5deg] rounded-md border border-line bg-fg p-3 text-ink shadow-[0_16px_40px_-16px_rgba(0,0,0,0.9)] sm:block lg:-right-6">
        <p className="font-mono text-[0.625rem] tracking-[0.14em] uppercase opacity-70">To verify</p>
        <ul className="mt-2 grid gap-1.5 text-[0.75rem] font-medium">
          {[
            ["Measure opening", true],
            ["Water hookup", true],
            ["Return policy", false],
          ].map(([t, done]) => (
            <li key={t as string} className="flex items-center gap-2">
              <span
                className={`grid h-3.5 w-3.5 place-items-center rounded-[3px] border border-ink ${
                  done ? "bg-ink text-fg" : ""
                }`}
              >
                {done && <Check className="h-2.5 w-2.5" strokeWidth={3.5} />}
              </span>
              <span className={done ? "line-through opacity-60" : ""}>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
