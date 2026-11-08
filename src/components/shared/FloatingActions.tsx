"use client";

import { MessageCircle, PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";
import { ENQUIRY_ANCHOR, WHATSAPP_CONFIGURED, whatsappHref } from "@/lib/constants";

export interface FloatingActionsProps {
  /** Extra classes for the WhatsApp button (design branches style it). */
  whatsappClassName?: string;
  /** Extra classes for the contact button. */
  contactClassName?: string;
  /** Where the contact button goes. Defaults to the enquiry section anchor. */
  contactHref?: string;
  className?: string;
}

/**
 * Fixed WhatsApp + Contact actions. Logic lives here; each design branch passes
 * its own classes. Both links are real actions – never decorative.
 */
export function FloatingActions({ whatsappClassName, contactClassName, contactHref = `/#${ENQUIRY_ANCHOR}`, className }: FloatingActionsProps) {
  const base =
    "group inline-flex size-12 items-center md:size-14 justify-center rounded-full shadow-[0_12px_28px_-10px_rgb(0_0_0/0.45)] transition-[translate,scale,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_18px_34px_-12px_rgb(0_0_0/0.5)] active:translate-y-0";
  return (
    <aside aria-label="Quick contact" className={cn("fixed bottom-4 right-4 z-50 flex flex-row-reverse items-center gap-3 print:hidden md:bottom-6 md:right-6 md:flex-col md:items-center", className)} data-testid="floating-actions">
      <a href={contactHref} className={cn(base, contactClassName)} aria-label="Contact us" title="Contact us" data-testid="floating-contact">
        <PhoneCall className="size-5 md:size-6 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
      </a>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, "bg-[#25D366] text-[#062a16] focus-visible:ring-[#25D366]/50", whatsappClassName)}
        aria-label={WHATSAPP_CONFIGURED ? "Chat with Pioneer Water Tanks on WhatsApp (opens in a new tab)" : "Open WhatsApp with a pre-filled enquiry message (opens in a new tab)"}
        title="WhatsApp"
        data-testid="floating-whatsapp"
        data-whatsapp-configured={WHATSAPP_CONFIGURED ? "true" : "false"}
      >
        <WhatsAppIcon className="size-6 md:size-7 transition-transform duration-300 group-hover:scale-110" />
      </a>
    </aside>
  );
}

/** Official-style WhatsApp glyph (lucide has no brand icons). */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.47 1.72 6.42L3.2 28.8l6.56-1.72a12.77 12.77 0 0 0 6.24 1.6h.01c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.68-12.81-12.68Zm0 23.36h-.01a10.6 10.6 0 0 1-5.41-1.48l-.39-.23-3.9 1.02 1.04-3.8-.25-.39a10.6 10.6 0 0 1-1.63-5.68c0-5.87 4.78-10.64 10.66-10.64 2.84 0 5.52 1.11 7.53 3.12a10.57 10.57 0 0 1 3.12 7.53c0 5.87-4.78 10.55-10.76 10.55Zm5.84-7.96c-.32-.16-1.9-.94-2.19-1.04-.29-.11-.51-.16-.72.16-.21.32-.83 1.04-1.02 1.26-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.68.77.24 1.46.21 2.01.13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

/** Icon helper exported for footers/headers that want a chat shortcut. */
export { MessageCircle as ChatIcon };
