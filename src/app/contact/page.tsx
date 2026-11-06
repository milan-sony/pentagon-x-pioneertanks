import type { Metadata } from "next";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { EnquirySection } from "@/components/home/EnquirySection";
import { contact, getPage } from "@/lib/content";

const page = getPage("contact");
export const metadata: Metadata = { title: page.title, description: `Contact Pioneer Water Tanks: ${contact.phone}, ${contact.email}, ${contact.address.full}.` };

export default function ContactPage() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${contact.address.lines[0]}, ${contact.address.full}`)}`;
  const cards = [
    { k: "Phone", v: contact.phone, href: contact.phoneHref },
    { k: "Fax", v: contact.fax },
    { k: "E-mail", v: contact.email, href: `mailto:${contact.email}` },
    { k: "Address", v: contact.address.full, href: mapsHref, external: true, note: "Open in Google Maps" },
  ];
  return (
    <>
      <PageHero title={page.title} eyebrow="Get in touch with us" intro={`${contact.address.lines[0]}, ${contact.address.full}.`} image="contact-banner" crumbs={[{ label: "Contact", href: "/contact" }]} />
      <Section className="bg-cream py-16 lg:py-20" aria-label="Contact details">
        <Stagger as="ul" className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <StaggerItem as="li" key={c.k} className="rounded-md border border-border bg-paper p-6 shadow-card">
              <p className="eyebrow text-bronze-text">{c.k}</p>
              {c.href ? (
                <a href={c.href} target={c.external ? "_blank" : undefined} rel={c.external ? "noopener noreferrer" : undefined} className="mt-3 block font-display text-lg font-bold leading-snug text-ink hover:text-water">
                  {c.v}
                </a>
              ) : (
                <p className="mt-3 font-display text-lg font-bold leading-snug text-ink">{c.v}</p>
              )}
              {c.note ? <p className="mt-1 text-xs text-taupe-text">{c.note}</p> : null}
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-8 text-sm text-taupe-text">No WhatsApp number, business hours or map location are published on the current website; the WhatsApp button uses the configured number or a share link until one is supplied.</Reveal>
      </Section>
      <EnquirySection heading="Contact form" />
    </>
  );
}
