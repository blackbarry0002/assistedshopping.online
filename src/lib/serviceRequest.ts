/**
 * Integration point for the secondary "service request" form.
 *
 * There is no backend in this project. To make the form live, set
 * NEXT_PUBLIC_FORM_ENDPOINT to the URL of a form-handling service you control
 * (for example Formspree, Basin, a CRM webhook, or your own API route). The
 * form will POST JSON to it and only show a success message if the endpoint
 * responds with a 2xx status.
 *
 * Until it is configured the form validates input but sends nothing, and it
 * tells the visitor so — it never shows a fake success message.
 */
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

export const isFormConnected = FORM_ENDPOINT.length > 0;

export type ServiceRequest = {
  firstName: string;
  email: string;
  phone: string;
  assistanceType: string;
  description: string;
  consent: boolean;
};

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: "not-connected" | "network" | "rejected" };

export async function submitServiceRequest(data: ServiceRequest): Promise<SubmitResult> {
  if (!isFormConnected) return { ok: false, reason: "not-connected" };
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...data, source: "assistedshoppings.online/contact" }),
    });
    return res.ok ? { ok: true } : { ok: false, reason: "rejected" };
  } catch {
    return { ok: false, reason: "network" };
  }
}

/** Rough checks that stop people pasting card numbers or codes into the form. */
export function looksSensitive(text: string): boolean {
  const digits = text.replace(/[\s-]/g, "");
  if (/\d{13,19}/.test(digits)) return true; // card-like number
  return /\b(password|passcode|pin|cvv|cvc|security code|one[- ]time code)\b\s*[:=]?\s*\S+/i.test(text);
}
