"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { ctaLabels, disclosures, mainNav, phone, telHref } from "@/config/site";
import { LogoLink } from "./Logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Every link in the menu calls `close`, so navigation always dismisses it.
  // Escape closes the menu and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur-md supports-[backdrop-filter]:bg-ink/80">
      <div className="mx-auto flex h-[var(--header-h)] max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <LogoLink onClick={close} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-[0.9375rem] text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Desktop: number is readable and clickable. */}
          <a
            href={telHref}
            data-cta="header"
            className="hidden min-h-11 items-center gap-2.5 rounded-lg bg-accent px-4 text-[0.9375rem] font-semibold text-black transition-colors hover:bg-accent-hover md:inline-flex"
          >
            <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={2.4} />
            <span>{ctaLabels.header}</span>
            <span aria-hidden="true" className="h-4 w-px bg-black/25" />
            <span className="font-mono text-[0.8125rem] font-medium">{phone.display}</span>
            <span className="sr-only"> — paid service</span>
          </a>
          {/* Small screens: icon-sized call button stays reachable. */}
          <a
            href={telHref}
            data-cta="header-mobile"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-3.5 text-sm font-semibold text-black md:hidden"
          >
            <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={2.4} />
            <span>Call</span>
            <span className="sr-only">
              {" "}
              {phone.display} for shopping assistance — paid service
            </span>
          </a>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-fg lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <div
        id={menuId}
        ref={panelRef}
        hidden={!open}
        className="border-t border-line bg-ink lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-[1200px] px-4 pt-2 pb-6 sm:px-6">
          <ul className="divide-y divide-line">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex min-h-12 items-center text-lg text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" onClick={close} className="flex min-h-12 items-center text-lg text-fg">
                Contact
              </Link>
            </li>
          </ul>
          <a
            href={telHref}
            data-cta="mobile-menu"
            className="mt-4 flex min-h-14 items-center justify-center gap-3 rounded-lg bg-accent px-5 font-semibold text-black"
          >
            <Phone aria-hidden="true" className="h-5 w-5" strokeWidth={2.4} />
            {ctaLabels.primary}
          </a>
          <p className="mt-3 text-center text-sm text-muted">{disclosures.paidShort}</p>
        </nav>
      </div>
    </header>
  );
}
