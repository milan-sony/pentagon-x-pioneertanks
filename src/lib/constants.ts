import { websiteData } from "@/data/website-content.js";

export const SITE_NAME = websiteData.company.name;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const ENQUIRY_EMAIL = websiteData.company.contact.email;
export const PHONE_DISPLAY = websiteData.company.contact.phone;
export const PHONE_HREF = websiteData.company.contact.phoneHref;

/**
 * WhatsApp business number in international format without "+", spaces or dashes
 * (e.g. 9715XXXXXXXX). The live site publishes no WhatsApp number (BLOCKER-1), so
 * this is read from the environment and is empty by default.
 */
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/[^\d]/g, "");
export const WHATSAPP_CONFIGURED = WHATSAPP_NUMBER.length >= 8;

export const WHATSAPP_MESSAGE =
  "Hello Pioneer Water Tanks, I would like to enquire about your water storage tanks.";

/**
 * Builds the WhatsApp deep link. When no number is configured the link falls back to
 * WhatsApp's share URL (`https://wa.me/?text=…`), which opens WhatsApp with the message
 * pre-filled and lets the visitor choose the recipient – so the button is never dead and no
 * number is fabricated.
 */
export function whatsappHref(message: string = WHATSAPP_MESSAGE): string {
  const text = encodeURIComponent(message);
  return WHATSAPP_CONFIGURED ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}` : `https://wa.me/?text=${text}`;
}

/** Anchor of the enquiry section on the homepage / products page. */
export const ENQUIRY_ANCHOR = "enquiry";

/** Viewports used by the Playwright screenshot suite. */
export const TEST_VIEWPORTS = [
  { name: "mobile-small", width: 360, height: 800 },
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1366, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "desktop-large", width: 1920, height: 1080 },
] as const;

/** Year and date of the build (set in next.config.ts); safe to use during prerendering. */
export const BUILD_YEAR = Number(process.env.NEXT_PUBLIC_BUILD_YEAR ?? 2026);
export const BUILD_DATE = process.env.NEXT_PUBLIC_BUILD_DATE ?? "2026-01-01T00:00:00.000Z";
