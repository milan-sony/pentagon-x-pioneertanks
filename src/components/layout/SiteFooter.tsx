import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { footerNavigation, mainNavigation } from "@/data/navigation.js";
import { company, contact, getActiveSocialLinks } from "@/lib/content";
import { BUILD_YEAR, whatsappHref } from "@/lib/constants";

/** Design 1 footer: espresso ground, link columns left, large "Get in touch" block right. */
export function SiteFooter() {
  const productNav = mainNavigation.find((n) => n.href === "/products")?.children ?? [];
  return (
    <footer className="bg-espresso text-cream">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 xl:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div className="sm:col-span-3">
              <div className="inline-block rounded-md bg-cream px-3 py-2">
                <Image src={company.logo.src} alt={company.logo.alt} width={company.logo.width} height={company.logo.height} className="h-9 w-auto" />
              </div>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/70">{company.description}</p>
            </div>
            <div>
              <h2 className="eyebrow text-bronze">Quick links</h2>
              <nav aria-label="Footer">
                <ul className="mt-4 grid gap-2 text-sm">
                  {footerNavigation.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="text-cream/85 hover:text-white">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/licenses" className="text-cream/85 hover:text-white">
                      Licenses
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div>
              <h2 className="eyebrow text-bronze">Products</h2>
              <ul className="mt-4 grid gap-2 text-sm">
                {productNav.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="text-cream/85 hover:text-white">
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-bronze">Follow</h2>
              <ul className="mt-4 grid gap-2 text-sm">
                {getActiveSocialLinks().map((s) => (
                  <li key={s.platform}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-cream/85 hover:text-white">
                      {s.platform}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="text-cream/85 hover:text-white">
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="flex items-start justify-between gap-6">
              <h2 className="font-display text-4xl font-bold uppercase tracking-wide text-white lg:text-5xl">Get in touch</h2>
              <Link href="/contact" className="inline-flex size-14 shrink-0 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:border-bronze hover:text-bronze" aria-label="Go to the contact page">
                <ArrowUpRight className="size-6" aria-hidden="true" />
              </Link>
            </div>
            <dl className="mt-8 grid gap-5">
              <div>
                <dt className="eyebrow text-cream/65">Email</dt>
                <dd className="mt-1 font-display text-xl font-semibold">
                  <a href={`mailto:${contact.email}`} className="hover:text-bronze">
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-cream/65">Phone</dt>
                <dd className="mt-1 font-display text-xl font-semibold">
                  <a href={contact.phoneHref} className="hover:text-bronze">
                    {contact.phone}
                  </a>
                  <span className="ml-3 text-sm font-normal text-cream/60">Fax {contact.fax}</span>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-cream/65">Office location</dt>
                <dd className="mt-1 font-display text-xl font-semibold">
                  <address className="not-italic">{contact.address.full}</address>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <p className="mt-14 border-t border-cream/15 pt-6 text-center text-xs text-cream/65">
          © {BUILD_YEAR} {company.legalName}. All rights reserved. Design concept 1 – Editorial Warm.
        </p>
      </div>
    </footer>
  );
}
