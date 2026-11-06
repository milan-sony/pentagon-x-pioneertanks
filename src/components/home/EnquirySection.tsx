import { Section } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { WhatsAppIcon } from "@/components/shared/FloatingActions";
import { contact, getProducts } from "@/lib/content";
import { ENQUIRY_ANCHOR, whatsappHref } from "@/lib/constants";

/** Enquiry: contact details left, validated form on paper right. Used on home, products and contact. */
export function EnquirySection({ defaultProduct, heading = "Request a quote" }: { defaultProduct?: string; heading?: string }) {
  const products = getProducts();
  return (
    <Section id={ENQUIRY_ANCHOR} className="bg-cream-2 py-20 lg:py-28" aria-labelledby="enquiry-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow text-bronze-text">Enquiry</p>
          <h2 id="enquiry-title" className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] font-bold uppercase leading-[1.02] tracking-wide text-ink">
            {heading}
          </h2>
          <p className="mt-5 text-taupe-text">Tell us the capacity, the liquid to be stored and the site. Our Abu Dhabi office replies with a specification and price.</p>
          <dl className="mt-8 grid gap-4 text-ink">
            <div>
              <dt className="eyebrow text-taupe-text">Phone</dt>
              <dd className="mt-1 font-display text-xl font-semibold">
                <a href={contact.phoneHref} className="hover:text-water">
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-taupe-text">E-mail</dt>
              <dd className="mt-1 font-display text-xl font-semibold">
                <a href={`mailto:${contact.email}`} className="hover:text-water">
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-taupe-text">WhatsApp</dt>
              <dd className="mt-1 flex items-center gap-2 font-display text-xl font-semibold">
                <WhatsAppIcon className="size-5 text-water" />
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="hover:text-water">
                  Message us
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-taupe-text">Address</dt>
              <dd className="mt-1">
                <address className="not-italic">{contact.address.full}</address>
                <span className="text-sm text-taupe-text">Fax {contact.fax}</span>
              </dd>
            </div>
          </dl>
        </Reveal>
        <Reveal delay={0.1} className="rounded-md bg-paper p-6 shadow-card sm:p-8 lg:col-span-7">
          <EnquiryForm
            heading="Enquiry form"
            productOptions={products.map((p) => ({ value: p.slug, label: p.shortName }))}
            defaultProduct={defaultProduct}
            classNames={{
              label: "eyebrow text-taupe-text",
              input: "min-h-12 w-full rounded-md border border-input bg-white px-3 py-2 text-ink focus-visible:border-water focus-visible:outline-none",
              error: "text-destructive",
              button: "rounded-md bg-water text-white hover:bg-water-deep eyebrow",
              help: "text-taupe-text",
              success: "rounded-md border-l-4 border-water bg-cream p-4 text-ink",
            }}
          />
        </Reveal>
      </div>
    </Section>
  );
}
