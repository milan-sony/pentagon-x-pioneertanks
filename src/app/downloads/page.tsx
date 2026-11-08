import type { Metadata } from "next";
import { FileDown } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";
import { Cta } from "@/components/shared/Cta";
import { getDownloads, getPage, getProduct } from "@/lib/content";

const page = getPage("downloads");
export const metadata: Metadata = { title: page.title, description: "PWT company brochure and four technical specification sheets (PLT, PFP, FLT, OLT) as PDF downloads." };

export default function DownloadsPage() {
  const docs = getDownloads();
  const kb = (b: number | null) => (b ? `${Math.round(b / 1024)} KB` : "");
  return (
    <>
      <PageHero title={page.title} eyebrow="Brochure · Technical specifications" intro="The company brochure and a technical specification sheet for every tank series." image="down-banner" crumbs={[{ label: "Downloads", href: "/downloads" }]} />
      {page.sections.map((s) => {
        const list = docs.filter((d) => (s.id === "brochure" ? d.type === "brochure" : d.type === "datasheet"));
        return (
          <Section key={s.id} className={s.id === "brochure" ? "bg-cream py-16 lg:py-24" : "border-t border-border bg-paper py-16 lg:py-24"} aria-labelledby={`${s.id}-title`}>
            <SectionHeading id={`${s.id}-title`} eyebrow={s.id === "brochure" ? "Company brochure" : "Datasheets"} title={s.heading ?? s.id} description={s.id === "brochure" ? "Twelve pages: mission, who we are, main features, applications, specifications, gross capacity chart, liner, foundation, flexible tanks and accessories." : "One sheet per tank series with construction, coating, bolting, roof, liner, nozzles, accessories, foundation and warranty."} />
            <Stagger as="ul" className={`mt-10 grid gap-6 ${s.id === "brochure" ? "" : "md:grid-cols-2"}`}>
              {list.map((d) => {
                const related = d.relatedProducts.map((slug) => getProduct(slug)?.shortName).filter(Boolean);
                return (
                  <StaggerItem as="li" key={d.id} className="rounded-md border border-border bg-paper p-6 shadow-card">
                    <p className="eyebrow text-bronze-text">
                      PDF · {d.pages} {d.pages === 1 ? "page" : "pages"} · {kb(d.bytes)}
                      {d.series ? ` · ${d.series} series` : ""}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-semibold uppercase tracking-wide text-ink">{d.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-taupe-text">{d.summary}</p>
                    {related.length ? <p className="mt-3 text-xs text-taupe-text">Applies to: {related.join(", ")}</p> : null}
                    <a href={d.localPath} download className="group mt-5 inline-flex min-h-12 items-center gap-2 rounded-md bg-water px-6 font-display text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-water-deep">
                      Download PDF <FileDown className="size-4" aria-hidden="true" />
                    </a>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </Section>
        );
      })}
      <Section className="border-t border-border bg-cream py-12" aria-label="Need more">
        <p className="text-taupe-text">Need a drawing, a capacity calculation or a quotation for a specific site?</p>
        <Cta href="/contact" className="mt-4">
          Contact the Abu Dhabi office
        </Cta>
      </Section>
    </>
  );
}
