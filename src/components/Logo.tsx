import Link from "next/link";
import { site } from "@/config/site";

/**
 * Original Shopping Assists mark: a conversation bubble holding a shopping
 * cart, with a check badge on the corner — "talk it through, choose
 * confidently". The same SVG is used by icon.svg, apple-icon and the OG image.
 *
 * Pass `size` (px) where CSS classes aren't available, e.g. in ImageResponse.
 */
export function LogoMark({ className = "h-8 w-8", size }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={size ? undefined : className}
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      <g transform="translate(-1.5 2.5) scale(0.92)">
        <path
          d="M6 3h20a3 3 0 0 1 3 3v15a3 3 0 0 1-3 3H14l-6.2 5.2c-.65.55-1.8.1-1.8-.76V24a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"
          fill="#FF6A00"
        />
        <path d="M8 8.4h2l2.3 9.1h10" fill="none" stroke="#050505" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.8 10.6h13.4l-1.8 5.6H12.3Z" fill="#050505" />
        <circle cx="13.6" cy="20" r="1.6" fill="#050505" />
        <circle cx="20.8" cy="20" r="1.6" fill="#050505" />
      </g>
      <circle cx="25.5" cy="6.5" r="6" fill="#F7F7F7" stroke="#050505" strokeWidth="1.6" />
      <path d="m22.9 6.6 1.8 1.8 3.6-3.6" fill="none" stroke="#050505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="text-[1.0625rem] leading-none font-semibold tracking-[-0.02em] text-fg">
        Shopping<span className="text-accent">·</span>Assists
      </span>
    </span>
  );
}

export function LogoLink({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="inline-flex shrink-0 items-center rounded-md"
      aria-label={`${site.name} — home`}
    >
      <Wordmark />
    </Link>
  );
}
