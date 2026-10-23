"use client";

import { useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { AlertTriangle, CircleCheck, Info } from "lucide-react";
import { services } from "@/config/site";
import {
  isFormConnected,
  looksSensitive,
  submitServiceRequest,
  type ServiceRequest,
} from "@/lib/serviceRequest";

type Errors = Partial<Record<keyof ServiceRequest | "contact", string>>;
type Status = "idle" | "submitting" | "sent" | "not-connected" | "error";

const assistanceOptions = [...services.map((s) => s.title), "Something else"];

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(d: ServiceRequest): Errors {
  const e: Errors = {};
  if (!d.firstName.trim()) e.firstName = "Enter your first name.";
  if (!d.email.trim() && !d.phone.trim()) e.contact = "Enter an email address or a phone number so we can reply.";
  if (d.email.trim() && !emailRe.test(d.email.trim())) e.email = "Enter a valid email address, like name@example.com.";
  if (d.phone.trim() && d.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a 10-digit US phone number.";
  if (!d.assistanceType) e.assistanceType = "Choose the type of help you need.";
  if (d.description.trim().length < 10) e.description = "Tell us a little about what you're shopping for.";
  else if (looksSensitive(d.description))
    e.description = "This looks like it may contain a card number, password, or code. Please remove it — we never need those.";
  if (!d.consent) e.consent = "Please confirm we may contact you about your request.";
  return e;
}

const inputCls =
  "mt-2 block w-full rounded-lg border bg-ink px-3.5 py-3 text-base text-fg placeholder:text-subtle focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-accent";

export function ServiceRequestForm() {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const f = (name: string) => `${id}-${name}`;
  const err = (name: keyof Errors) => (errors[name] ? `${f(name)}-error` : undefined);
  const border = (name: keyof Errors) => (errors[name] ? "border-[#f87171]" : "border-line-strong");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: ServiceRequest = {
      firstName: String(fd.get("firstName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      assistanceType: String(fd.get("assistanceType") ?? ""),
      description: String(fd.get("description") ?? ""),
      consent: fd.get("consent") === "on",
    };
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus("submitting");
    const result = await submitServiceRequest(data);
    if (result.ok) {
      setStatus("sent");
      form.reset();
    } else {
      setStatus(result.reason === "not-connected" ? "not-connected" : "error");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const errorList = Object.entries(errors);

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-6" aria-describedby={`${id}-intro`}>
      {!isFormConnected && (
        <p
          id={`${id}-intro`}
          className="flex gap-3 rounded-lg border border-dashed border-review/50 bg-[#1c1606] p-4 text-sm leading-relaxed text-review"
        >
          <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <strong className="font-semibold">Prototype form.</strong> This form is not connected to
            a delivery service yet, so submissions are not sent. Please call instead.
          </span>
        </p>
      )}

      {errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-lg border border-[#f87171]/60 bg-[#2a0f0f] p-4 text-sm text-[#fecaca]"
        >
          <p className="font-semibold">Please fix {errorList.length === 1 ? "this" : "these"} to continue:</p>
          <ul className="mt-2 list-disc pl-5">
            {errorList.map(([k, v]) => (
              <li key={k}>{v}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label htmlFor={f("firstName")} className="text-sm font-medium text-fg">
          First name
        </label>
        <input
          id={f("firstName")}
          name="firstName"
          autoComplete="given-name"
          aria-invalid={!!errors.firstName}
          aria-describedby={err("firstName")}
          className={`${inputCls} ${border("firstName")}`}
        />
        {errors.firstName && <p id={`${f("firstName")}-error`} className="mt-1.5 text-sm text-[#fca5a5]">{errors.firstName}</p>}
      </div>

      <fieldset className="grid gap-4 sm:grid-cols-2" aria-describedby={`${id}-contact-hint ${errors.contact ? `${f("contact")}-error` : ""}`}>
        <legend className="mb-1 text-sm font-medium text-fg">How should we reply?</legend>
        <p id={`${id}-contact-hint`} className="-mt-1 text-sm text-muted sm:col-span-2">
          Provide at least one.
        </p>
        <div>
          <label htmlFor={f("email")} className="text-sm text-muted">Email</label>
          <input
            id={f("email")}
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!(errors.email || errors.contact)}
            aria-describedby={err("email")}
            className={`${inputCls} ${border(errors.contact ? "contact" : "email")}`}
          />
          {errors.email && <p id={`${f("email")}-error`} className="mt-1.5 text-sm text-[#fca5a5]">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor={f("phone")} className="text-sm text-muted">Phone</label>
          <input
            id={f("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!(errors.phone || errors.contact)}
            aria-describedby={err("phone")}
            className={`${inputCls} ${border(errors.contact ? "contact" : "phone")}`}
          />
          {errors.phone && <p id={`${f("phone")}-error`} className="mt-1.5 text-sm text-[#fca5a5]">{errors.phone}</p>}
        </div>
        {errors.contact && (
          <p id={`${f("contact")}-error`} className="text-sm text-[#fca5a5] sm:col-span-2">{errors.contact}</p>
        )}
      </fieldset>

      <div>
        <label htmlFor={f("assistanceType")} className="text-sm font-medium text-fg">
          Type of shopping assistance
        </label>
        <select
          id={f("assistanceType")}
          name="assistanceType"
          defaultValue=""
          aria-invalid={!!errors.assistanceType}
          aria-describedby={err("assistanceType")}
          className={`${inputCls} ${border("assistanceType")} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%23b8b8b8' stroke-width='2'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E")] bg-[position:right_0.875rem_center] bg-no-repeat pr-10`}
        >
          <option value="" disabled>
            Choose one…
          </option>
          {assistanceOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        {errors.assistanceType && <p id={`${f("assistanceType")}-error`} className="mt-1.5 text-sm text-[#fca5a5]">{errors.assistanceType}</p>}
      </div>

      <div>
        <label htmlFor={f("description")} className="text-sm font-medium text-fg">
          What are you shopping for?
        </label>
        <p id={`${f("description")}-hint`} className="mt-1 text-sm text-muted">
          A few sentences is plenty. Do not include passwords, one-time codes, account numbers, or
          payment card details.
        </p>
        <textarea
          id={f("description")}
          name="description"
          rows={5}
          maxLength={1500}
          aria-invalid={!!errors.description}
          aria-describedby={`${f("description")}-hint ${err("description") ?? ""}`}
          className={`${inputCls} ${border("description")} resize-y`}
        />
        {errors.description && <p id={`${f("description")}-error`} className="mt-1.5 text-sm text-[#fca5a5]">{errors.description}</p>}
      </div>

      <div>
        <div className="flex gap-3">
          <input
            id={f("consent")}
            name="consent"
            type="checkbox"
            aria-invalid={!!errors.consent}
            aria-describedby={err("consent")}
            className="mt-1 h-5 w-5 shrink-0 accent-[#ff6a00]"
          />
          <label htmlFor={f("consent")} className="text-sm leading-relaxed text-muted">
            I agree that Assisted Shopping may contact me by email or phone about this request.
            I understand personalized assistance is a paid service and that I&apos;ll be told the
            price before any paid work begins.
          </label>
        </div>
        {errors.consent && <p id={`${f("consent")}-error`} className="mt-1.5 text-sm text-[#fca5a5]">{errors.consent}</p>}
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-12 items-center justify-center rounded-lg border border-line-strong bg-surface-2 px-6 font-semibold text-fg transition-colors hover:border-accent disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send request"}
        </button>
      </div>

      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="empty:hidden">
        {status === "sent" && (
          <p className="flex gap-3 rounded-lg border border-ok/40 bg-ok-soft p-4 text-sm text-fg">
            <CircleCheck aria-hidden="true" className="h-5 w-5 shrink-0 text-ok" />
            Your request was received by our form service. We&apos;ll reply using the contact details
            you provided.
          </p>
        )}
        {status === "not-connected" && (
          <p className="flex gap-3 rounded-lg border border-review/50 bg-[#1c1606] p-4 text-sm text-review">
            <AlertTriangle aria-hidden="true" className="h-5 w-5 shrink-0" />
            Your details look good, but this prototype form isn&apos;t connected yet — nothing was
            sent. Please call us instead.
          </p>
        )}
        {status === "error" && (
          <p className="flex gap-3 rounded-lg border border-[#f87171]/60 bg-[#2a0f0f] p-4 text-sm text-[#fecaca]">
            <AlertTriangle aria-hidden="true" className="h-5 w-5 shrink-0" />
            Something went wrong and your request was not sent. Please try again or call us.
          </p>
        )}
      </div>
    </form>
  );
}
