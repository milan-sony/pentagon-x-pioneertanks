import type { Metadata } from "next";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { GalleryGrid } from "@/components/shared/GalleryGrid";
import { Cta } from "@/components/shared/Cta";
import { getAsset, getCertifications, getPage } from "@/lib/content";

const page = getPage("licenses");
export const metadata: Metadata = { title: page.title, description: "ISO 9001 certificate of assessment, Abu Dhabi commercial licence and the Pioneer ten-year warranty." };

export default function LicensesPage() {
  const certs = getCertifications();
  return (
    <>
      <PageHero title={page.title} eyebrow="About · Licenses" intro="Our licence, quality certificate and tank warranty. Select a document to view it full size." image="license-banner" crumbs={[{ label: "About", href: "/about" }, { label: "Licenses", href: "/licenses" }]} />
      <Section className="bg-cream py-16 lg:py-24" aria-labelledby="docs-title">
        <SectionHeading id="docs-title" eyebrow="Documents" title="Licence, certificate and warranty" />
        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <GalleryGrid groups={[{ id: "licences", name: "Licences", assets: certs.map((c) => getAsset(c.image)) }]} classNames={{ filterBar: "hidden", grid: "mt-0 sm:grid-cols-3 lg:grid-cols-3", caption: "text-taupe-text", tile: "rounded-md bg-paper p-2 shadow-card" }} />
          </div>
          <Reveal className="lg:col-span-5">
            <dl className="grid gap-8">
              {certs.map((c) => (
                <div key={c.id} className="rounded-md border border-border bg-paper p-6">
                  <dt className="font-display text-lg font-semibold uppercase tracking-wide text-ink">{c.name}</dt>
                  {c.issuer ? <dd className="mt-1 text-sm text-taupe-text">Issued by {c.issuer}</dd> : null}
                  <dd>
                    <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-ink/85">
                      {c.details.map((d) => (
                        <li key={d} className="flex gap-3">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-bronze" aria-hidden="true" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
            <Cta href="/contact" className="mt-8">
              Request current certificates
            </Cta>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
