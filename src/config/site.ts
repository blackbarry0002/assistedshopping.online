/**
 * Central site configuration for Assisted Shopping.
 *
 * Everything that is business-specific (brand, phone, navigation, service
 * categories, legal links) lives here so it can be changed in one place.
 */

/* =============================================================================
 * !!!  PLACEHOLDER PHONE NUMBER — REPLACE AND VERIFY BEFORE DEPLOYMENT  !!!
 * -----------------------------------------------------------------------------
 * +1 (800) 555-0147 is a NON-OPERATIONAL placeholder (555-01XX numbers are
 * reserved for fictional use). It is NOT a working business line.
 *
 * Before launch:
 *   1. Replace `display` and `e164` below with the real business number.
 *   2. Call the number from a mobile phone and confirm it reaches the business.
 *   3. Set `isPlaceholder` to `false`. This removes the on-site "preview"
 *      notice and silences the production build warning in next.config.ts.
 *
 * Every phone CTA, the header, the mobile call bar, the footer and the
 * contact page read from this object. Do not hard-code the number elsewhere.
 * ========================================================================== */
export const phone = {
  /** Human-readable format shown on the page. */
  display: "+1 (800) 555-0147",
  /** E.164 format used for the `tel:` link. Digits only, leading "+". */
  e164: "+18005550147",
  /** Keep `true` until a real, verified number is configured. */
  isPlaceholder: true,
} as const;

export const telHref = `tel:${phone.e164}`;

export const site = {
  name: "Assisted Shopping",
  domain: "assistedshoppings.online",
  url: "https://assistedshoppings.online",
  tagline: "Shop smarter. Choose confidently.",
  promise:
    "Tell us what you're looking for. A real person will help you work through your options.",
  description:
    "Get independent, personalized help comparing products, finding parts, and planning shopping lists. Call Assisted Shopping to discuss our paid guidance services.",
  seoTitle: "Assisted Shopping | Independent Product Research & Shopping Guidance",
  /** One-sentence business description used in the footer. */
  summary:
    "Assisted Shopping is an independent, paid service that helps people in the United States research products, compare options, and plan purchases with a real person.",
  market: "United States",
} as const;

/* -----------------------------------------------------------------------------
 * Business identity — intentionally empty until real details are supplied.
 * Do not invent a legal entity, address, or registration number.
 * -------------------------------------------------------------------------- */
export const business = {
  /** Legal entity that owns and operates the site. */
  legalName: "Chowdhury Consultants LLC" as string | null,
  /** Public business location shown on the site. */
  mailingAddress: "Jamaica, NY 11432-2043, United States" as string | null,
  /** Support email for written requests — leave null until confirmed. */
  email: null as string | null,
  /** Operating hours as actually staffed — leave null until confirmed. */
  hours: null as string | null,
};

export const disclosures = {
  paid: "Personalized assistance is a paid service. Ask about the available options and pricing before proceeding.",
  paidShort: "Independent paid assistance. Ask about scope and pricing before proceeding.",
  independent:
    "Independent service. Not affiliated with or endorsed by any retailer or manufacturer.",
  independentShort: "Not affiliated with or endorsed by any retailer or manufacturer.",
  noObligation:
    "Calling does not obligate you to purchase a service. Paid work begins only after the applicable scope and price have been explained and accepted.",
  noCredentials:
    "We never ask for your retailer password, one-time passcode, or payment card security code.",
  verify:
    "Recommendations depend on the information provided and publicly available product details. Availability, pricing, compatibility, and final purchase terms must be confirmed with the relevant seller or manufacturer.",
} as const;

export const ctaLabels = {
  primary: "Call for Shopping Assistance",
  header: "Call for Assistance",
  assistant: "Talk to a Shopping Assistant",
  choose: "Get Help Choosing the Right Product",
  discuss: "Call to Discuss Your Needs",
  start: "Call to Get Started",
  mobileBar: "Call for Help",
} as const;

export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Service Fees", href: "/#pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/#faq" },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund & Cancellation Policy", href: "/refund-policy" },
];

export const companyLinks: NavLink[] = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Service Fees", href: "/#pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export type ServiceIcon = "compare" | "home" | "bulk" | "search";

export type ServiceCategory = {
  id: string;
  title: string;
  icon: ServiceIcon;
  description: string;
  whenToCall: string;
  deliverables: string[];
  cta: string;
};

/**
 * Service categories. Add a new object here to add a category to the
 * homepage grid, the footer, and the contact form's dropdown.
 */
export const services: ServiceCategory[] = [
  {
    id: "product-research",
    title: "Product Research and Comparison",
    icon: "compare",
    description:
      "Compare products based on your budget, preferred features, specifications, and intended use.",
    whenToCall:
      "Call when you've narrowed it to a few options, or don't know where to start.",
    deliverables: [
      "A personalized shortlist",
      "Side-by-side product comparisons",
      "Explanation of important specifications",
      "Questions to consider before buying",
    ],
    cta: "Get Product Guidance",
  },
  {
    id: "home-improvement",
    title: "Home Improvement Shopping",
    icon: "home",
    description:
      "Planning a home project? Get help identifying the tools, materials, accessories, and parts worth researching.",
    whenToCall: "Call before your first trip to the store, or when a project stalls.",
    deliverables: [
      "A project shopping list",
      "Product and parts research",
      "Compatibility questions to verify",
      "What information to collect before purchasing",
    ],
    cta: "Plan My Shopping List",
  },
  {
    id: "membership-bulk",
    title: "Membership and Bulk-Buying Guidance",
    icon: "bulk",
    description:
      "Understand publicly available membership benefits and compare bulk-buying options to decide what may offer value for your household.",
    whenToCall: "Call when you're weighing a membership or a large bulk purchase.",
    deliverables: [
      "Explanation of published membership terms",
      "Comparison of publicly available offers",
      "Bulk versus individual purchase calculations",
      "Product research based on household needs",
    ],
    cta: "Compare My Options",
  },
  {
    id: "find-item",
    title: "Finding a Specific Product or Part",
    icon: "search",
    description:
      "Describe the item you need and share the available product details so we can help you research possible matches.",
    whenToCall: "Call when you have a model number, a photo, or a description to start from.",
    deliverables: [
      "Product identification research",
      "Specification-based matching",
      "Alternative product suggestions",
      "Compatibility details to verify with the seller",
    ],
    cta: "Find the Right Item",
  },
];

/**
 * Google tag (gtag.js) for Google Ads. Set to null to remove the tag from
 * every page. Loaded by `src/components/GoogleTag.tsx`.
 */
export const googleTag = {
  id: "AW-18430161458" as string | null,
};

/**
 * Call pop-up shown once per browser session (see CallPopup.tsx).
 * Set `enabled: false` to turn it off everywhere.
 */
export const popup = {
  enabled: true,
  /**
   * Delay after the first page loads. Long enough for visitors to read the
   * hero and start scrolling, so the pop-up arrives as a reminder rather
   * than an interruption (and is gentler on Google Ads landing-page review).
   */
  delayMs: 12000,
};

/** Feature flags for sections that require real-world input before showing. */
export const features = {
  /**
   * Testimonials stay hidden until real, authorized customer feedback exists.
   * Never add invented quotes, star ratings, or review badges.
   */
  showTestimonials: false,
};
