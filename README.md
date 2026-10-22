# Shopping Assists — shoppingassists.online

Marketing website for **Shopping Assists**, an independent, human-led, paid
shopping-assistance service for customers in the United States.

The site has one main conversion: **a phone call**. Every design decision
supports this path:

> Recognize the problem → understand the human-led solution → trust the
> independent positioning → understand the service is paid → call.

> **Before launch, read [`LAUNCH_CHECKLIST.md`](LAUNCH_CHECKLIST.md).** The
> phone number is a placeholder and several business details are still to be
> supplied.

---

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack, statically prerendered)
- React 19 + TypeScript
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- [Lucide](https://lucide.dev) icons
- Geist / Geist Mono fonts via `next/font` (self-hosted at build time)

No backend or database is included. The only third-party script is the
Google tag (gtag.js) for Google Ads.

## Requirements

- Node.js **20.9 or newer** (developed on Node 24 LTS)
- npm

## Setup and development

```bash
npm install
cp .env.example .env.local   # optional, see "Environment variables"
npm run dev                  # http://localhost:3000
```

| Command         | What it does                                  |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Start the dev server with hot reload          |
| `npm run lint`  | Run ESLint (Next.js core-web-vitals + TS)     |
| `npm run build` | Create a production build                     |
| `npm run start` | Serve the production build locally            |

## Replacing the phone number (required before launch)

The number appears in the header, hero, every section CTA, the mobile call
bar, the contact page, the 404 page, and the footer — but it is defined in
**one place**:

```ts
// src/config/site.ts
export const phone = {
  display: "+1 (800) 555-0147",  // shown on the page
  e164: "+18005550147",          // used for the tel: link
  isPlaceholder: true,           // set to false once the real number is verified
};
```

1. Replace `display` and `e164` with the real business number.
2. Call it from a mobile phone and confirm it reaches the business.
3. Set `isPlaceholder: false`. This removes the yellow "Preview site" notice
   at the top of every page and silences the warning printed during
   `npm run build`.

To confirm nothing is hard-coded elsewhere:

```bash
grep -rn "555-0147\|18005550147" src --include=*.ts --include=*.tsx
```

Only `src/config/site.ts` should match.

## Environment variables

See [`.env.example`](.env.example).

| Variable                     | Purpose                                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_ALLOW_INDEXING` | Set to `true` **only in production**. Otherwise `robots.txt` disallows all crawling (safe for previews).  |
| `NEXT_PUBLIC_FORM_ENDPOINT`  | URL that receives the contact form as JSON (`POST`). Empty = form stays in labelled prototype mode.       |

`NEXT_PUBLIC_*` values are inlined at build time — rebuild after changing them.

## Project structure

```
src/
  app/
    layout.tsx            Root layout, global metadata, header/footer/mobile bar
    page.tsx              Homepage (assembles the sections below)
    about/ contact/ privacy/ terms/ refund-policy/
    not-found.tsx         404 page
    sitemap.ts robots.ts  SEO routes
    opengraph-image.tsx   Generated social-share image
    icon.svg apple-icon.tsx
    globals.css           Design tokens + base styles
  config/site.ts          ← brand, PHONE, CTA labels, nav, services, legal links, feature flags
  content/faq.ts          FAQ questions/answers (also feeds FAQPage JSON-LD)
  components/
    PhoneCTA.tsx          The reusable call button (+ PhoneNumberLink)
    IndependenceDisclosure.tsx
    SiteHeader.tsx MobileCallBar.tsx SiteFooter.tsx Logo.tsx
    PlaceholderNotice.tsx  Shown while phone.isPlaceholder is true
    ServiceRequestForm.tsx Secondary contact form (client-side validation)
    CtaClickTracker.tsx    Delegated, privacy-safe click tracking for data-cta links
    LegalPage.tsx
    sections/             HeroSection, ProblemCards, ServiceCategoryCards,
                          HumanGuidanceSection, PaidServiceSection, HowItWorks,
                          TrustSection, Testimonials (hidden), FAQSection/FAQAccordion,
                          FinalCallToAction
    ui/                   Container, SectionHeading, PageHeader, ReviewNote
  lib/
    analytics.ts          trackCtaClick() — no-op unless an analytics tool is installed
    serviceRequest.ts     Form integration point
```

### Adding a service category

Add an object to `services` in `src/config/site.ts`. It appears automatically
in the homepage grid (with an anchor `/#<id>`), the footer, and the contact
form dropdown. Pick an icon key from `ServiceIcon` or add one in
`ServiceCategoryCards.tsx`.

### Editing copy

- Disclosures and CTA labels: `src/config/site.ts`
- FAQ: `src/content/faq.ts`
- Section copy: the matching file in `src/components/sections/`

## Contact form

`/contact` has a short secondary form (first name, email **or** phone,
assistance type, description, consent). It never collects passwords, account
numbers, card data, or one-time codes, and it rejects descriptions that look
like they contain a card number or code.

Without `NEXT_PUBLIC_FORM_ENDPOINT` the form validates input, sends nothing,
and tells the visitor so. With it set, the form `POST`s JSON to the endpoint
and shows a success message **only** on a 2xx response. Integration logic:
`src/lib/serviceRequest.ts`.

## Call pop-up

`src/components/CallPopup.tsx` shows a call-to-action dialog once per
browser session (tracked in `sessionStorage`), 12 s after the first page
loads. It waits if the tab is in the background, and it is skipped if the
visitor has already tapped a call button. It uses the native `<dialog>` element: focus moves into it, Escape,
the close button, "Not now", or a backdrop click dismisses it. Settings live
in `popup` in `src/config/site.ts` (`enabled`, `delayMs`). It sends a
`cta_popup_shown` event to the Google tag; its call button is tracked as
`cta_id: "popup"`.

Keep its copy honest: no invented discounts, "free" claims, countdowns, or
availability promises.

## Analytics

**Google tag (Google Ads `AW-18430161458`)** loads on every page via
`src/components/GoogleTag.tsx`. Change or remove it with `googleTag.id` in
`src/config/site.ts` (set to `null` to remove).

Every phone link carries a `data-cta="<location>"` attribute.
`CtaClickTracker` sends each click to the Google tag as
`gtag("event", "cta_call_click", { cta_id, page_path })` and dispatches an
`as:cta-click` DOM event.

To count call-button clicks as a Google Ads conversion, create a conversion
action in Google Ads and put its `send_to` value (e.g.
`AW-18430161458/AbCdEf…`) in `CONVERSION_SEND_TO` in `src/lib/analytics.ts`.

A CTA click is **not** a completed call. Do not report clicks as calls. For
real call conversions, use Google Ads call tracking / your telephony
provider's reporting.

## SEO

- Title, description, Open Graph and Twitter metadata in `src/app/layout.tsx`;
  per-page titles/descriptions/canonicals in each `page.tsx`.
- `metadataBase` and canonical URLs use `site.url`
  (`https://shoppingassists.online`).
- `/sitemap.xml` lists public pages; update `LAST_MODIFIED` in
  `src/app/sitemap.ts` when content changes.
- `/robots.txt` blocks crawling unless `NEXT_PUBLIC_ALLOW_INDEXING=true`.
- Structured data: **FAQPage only**, mirroring the visible FAQ. No
  LocalBusiness, reviews, ratings, or address data are published, because none
  have been verified.

## Deployment (GitHub Pages)

The site is a **static export** (`output: "export"` in `next.config.ts`) and is
deployed to GitHub Pages by `.github/workflows/nextjs.yml` on every push to
`main`:

1. `next build` writes the complete site to `./out`.
2. The workflow uploads `./out` as the Pages artifact and deploys it.

Repository settings that must stay in place:

- **Settings → Pages → Source:** GitHub Actions.
- **Settings → Pages → Custom domain:** `shoppingassists.online`, with
  "Enforce HTTPS" enabled once the certificate is issued. `public/CNAME`
  carries the same domain.
- **DNS:** apex `A` records to GitHub Pages (185.199.108.153, .109.153,
  .110.153, .111.153) and `AAAA` records (2606:50c0:8000::153 … 8003::153);
  `www` as a `CNAME` to `blackbarry0002.github.io`.

Indexing is controlled by `NEXT_PUBLIC_ALLOW_INDEXING` in the workflow's build
step (currently `"false"`). Set it to `"true"` once the real phone number is
live.

Static hosting limits: no server code, no custom HTTP headers (security
headers would need a CDN such as Cloudflare in front of Pages), and the
share image / Apple icon are static PNGs in `src/app/`. To preview the export
locally: `npm run build && python3 -m http.server --directory out`.

## Accessibility notes

Target: WCAG 2.2 AA. Includes a skip link, one `h1` per page, ordered heading
levels, visible focus rings, a WAI-ARIA accordion for the FAQ, an accessible
mobile menu (`aria-expanded`, Escape to close, focus return), labelled form
fields with linked error messages and an error summary, 44px+ tap targets,
`prefers-reduced-motion` support, and icons paired with text so nothing relies
on colour alone. CTA buttons use black text on orange (`#FF6A00`, ≈7:1).

## Brand and content rules

- The identity (speech-bubble cart mark with a check badge, black + orange system, receipt and
  measuring-tape motifs) is original. Do not add retailer logos, names in
  titles/metadata, screenshots, product photography, or uniforms.
- Do not add testimonials, ratings, review badges, customer counts, savings
  figures, response-time promises, "agents online" indicators, countdowns, or
  partnerships unless they are real and verified. `features.showTestimonials`
  stays `false` until real, authorized feedback exists.
