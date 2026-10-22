# Launch-readiness checklist

Everything below needs **real business information or an operational
decision** before shoppingassists.online goes live. Items are grouped by
risk. Nothing in this repository has been verified against a real phone line,
legal review, or production host.

Tip: search the code for `ReviewNote` and `isPlaceholder` to find every
on-page marker.

---

## 1. Blockers — do not launch without these

- [ ] **Real phone number.** Replace the placeholder `+1 (800) 555-0147` in
      `src/config/site.ts` (`display` and `e164`).
- [ ] **Verify the number works**: call it from a mobile phone and a desktop
      softphone; confirm it reaches the business, not a carrier message.
- [ ] Set `phone.isPlaceholder = false` (removes the yellow "Preview site"
      banner and the build warning).
- [ ] **Confirm the operating process matches the site's promises.** The site
      states, in several places, that:
  - the service and price are explained **before** any paid work begins;
  - calling does **not** obligate the caller to pay;
  - there are **no** hidden subscriptions or automatic recurring charges;
  - customers buy directly from sellers; the business does not purchase on
        their behalf (unless a separately agreed, lawful service says otherwise);
  - the business **never** asks for retailer passwords, one-time passcodes, or
        card security codes;
  - no purchase through a particular retailer is required.

  If any of these is not true in practice, change the copy (config, FAQ,
  `PaidServiceSection`, `HumanGuidanceSection`, `TrustSection`, legal pages)
  **before** launch.
- [ ] **Train whoever answers the phone** to state at the start of each call
      that the business is independent, not the retailer's customer service,
      and that assistance is paid — and to explain price and scope before
      starting work.
- [ ] **Legal review** of `/terms`, `/privacy`, and `/refund-policy` by a
      qualified attorney. These are structured drafts only and do not
      guarantee compliance. Fill every "Review before launch" note, then
      delete the notes and set the `lastUpdated` date on each page.
- [ ] **Refund & cancellation terms** decided and written (currently blank
      placeholders on `/refund-policy`).
- [ ] **Payment process** decided (processor, when payment is taken, how
      price is confirmed — ideally in writing) and described in `/terms`.

## 2. Business identity (supply real data — do not invent)

In `src/config/site.ts → business`:

- [x] `legalName` — Chowdhury Consultants LLC.
- [ ] `email` — a written contact method (needed for privacy requests too).
- [ ] `hours` — **only hours the business can actually staff.**
- [x] `mailingAddress` — Jamaica, NY 11432-2043, United States (no street
      address published; add one only if you want it public).
- [x] About page: "Who we are" now names the owner and location.
- [ ] Terms page: confirm the state of organization of Chowdhury Consultants LLC.
- [ ] About page: **affiliate / referral compensation disclosure.** State
      clearly whether the business earns commissions or fees from sellers. If
      it does, disclose it near recommendations (FTC Endorsement Guides).

## 3. Compliance and consumer-protection checks

- [ ] Check whether any state/local registration or licensing applies to a
      paid consumer consulting service where the business operates.
- [ ] If calls are **recorded**, announce it on every call and disclose it in
      the Privacy Policy (several US states require all-party consent).
- [ ] If the business will **call or text** people back (including form
      leads), review TCPA rules; the form's consent text currently covers
      contact "about this request" only — no marketing.
- [ ] If using paid ads, confirm ad copy and landing pages do not use retailer
      names in a way that implies official support or affiliation, and that
      they comply with each ad platform's policies on third-party support
      services (some platforms restrict or require certification for these).
- [ ] Review state privacy-law applicability (CA, CO, VA, CT, TX, etc.) and
      update the Privacy Policy.
- [ ] Confirm the copy contains no unsupported claims: no guaranteed savings,
      no "lowest price," no response-time guarantees, no credentials or team
      size that are not real.

## 4. Technical setup

- [ ] Deploy (see README → Deployment) and attach the
      `shoppingassists.online` domain with HTTPS.
- [ ] Decide on `www` vs apex and redirect one to the other; keep
      `site.url` consistent.
- [ ] Set `NEXT_PUBLIC_ALLOW_INDEXING=true` in **production only**, rebuild,
      and verify `https://shoppingassists.online/robots.txt` allows
      crawling and lists the sitemap.
- [ ] Submit `https://shoppingassists.online/sitemap.xml` in Google Search
      Console and Bing Webmaster Tools.
- [ ] Contact form: either set `NEXT_PUBLIC_FORM_ENDPOINT` to a real,
      monitored service (and test a submission end-to-end), or remove the
      form from `/contact`. Someone must actually read and answer submissions.
- [x] Google tag (Google Ads `AW-18430161458`) installed on every page.
- [ ] In Google Tag Assistant, confirm the tag fires on the production domain.
- [ ] Optional: create a "call button click" conversion action and add its
      `send_to` value to `CONVERSION_SEND_TO` in `src/lib/analytics.ts`.
      Never report clicks as completed calls.
- [ ] Decide with counsel whether a cookie-consent banner and/or a "Do Not
      Sell or Share" opt-out link is required because of the Ads tag
      (see the note on `/privacy`).
- [ ] Call pop-up: watch Google Ads landing-page experience and bounce rate.
      If mobile performance suffers, raise `popup.delayMs` or set
      `popup.enabled = false` in `src/config/site.ts`.
- [ ] Check the Open Graph image and title by pasting the production URL into
      a social-share preview tool.
- [ ] Run Lighthouse / PageSpeed on the production URL (performance,
      accessibility, SEO) and an automated accessibility scan (e.g. axe).

## 5. Manual QA that could not be done in development

These were **not** verifiable in the build environment:

- [ ] Tapping each call button on a real iPhone and Android device opens the
      dialer with the correct number (15 call links on the homepage plus the
      other pages — all read from the same config).
- [ ] Mobile call bar clears the iOS Safari toolbar / home indicator and the
      Android navigation bar, and never hides footer disclosures.
- [ ] Screen-reader pass (VoiceOver iOS/macOS, NVDA or JAWS on Windows) of the
      homepage, menu, FAQ, and contact form.
- [ ] Keyboard-only pass on desktop browsers (Chrome, Safari, Firefox, Edge).
- [ ] 200% browser zoom and large-text settings on mobile.

## 6. After launch

- [ ] Testimonials: only after collecting **real** feedback with written
      permission to publish. Then add entries in
      `src/components/sections/Testimonials.tsx` and set
      `features.showTestimonials = true`. Never add star ratings or review
      badges that are not tied to a real, verifiable source.
- [ ] Revisit pricing copy once standard service packages and prices exist;
      publish them in the "Service fees" section if appropriate.
- [ ] Update `LAST_MODIFIED` in `src/app/sitemap.ts` when content changes.
