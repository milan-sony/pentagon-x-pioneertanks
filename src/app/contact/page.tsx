import type { Metadata } from "next";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { contact, getPage, getProducts } from "@/lib/content";
import { ENQUIRY_ANCHOR } from "@/lib/constants";

const page = getPage("contact");
export const metadata: Metadata = { title: page.title, description: `Contact Pioneer Water Tanks: ${contact.phone}, ${contact.email}, ${contact.address.full}.` };

/** Baseline Contact page – themes replace this file. */
export default function ContactPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold">{page.title}</h1>
      <address className="mt-6 not-italic">
        {contact.address.full}
        <br />
        <a href={contact.phoneHref}>{contact.phone}</a> · Fax {contact.fax} · <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </address>
      <section id={ENQUIRY_ANCHOR} className="mt-10">
        <h2 className="text-2xl font-semibold">Contact form</h2>
        <div className="mt-4">
          <EnquiryForm productOptions={getProducts().map((p) => ({ value: p.slug, label: p.shortName }))} classNames={{ input: "border px-3 py-2", button: "bg-primary text-primary-foreground", error: "text-destructive" }} />
        </div>
      </section>
    </article>
  );
}
