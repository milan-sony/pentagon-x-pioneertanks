import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { Cta } from "@/components/shared/Cta";
import { ProductTechnicalTabs } from "@/components/products/ProductDetailBlocks";
import { EnquirySection } from "@/components/home/EnquirySection";
import { assetSrc, getAsset, getPage, getProductFamilies, getProducts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Products – steel liner tanks and flexible tanks",
  description: "Corrugated Zincalume steel liner tanks up to 3,300 m³, flat panel HDG steel tanks and flexible PVC pillow and onion tanks up to 300 m³. Full specifications and datasheets.",
};

export default function ProductsPage() {
  const page = getPage("products");
  const intro = page.sections.find((s) => s.id === "intro")!;
  const families = getProductFamilies();
  const products = getProducts();
  return (
    <>
      <PageHero title={page.title} eyebrow="Steel liner tanks · Flexible tanks" intro={intro.body?.[0]} image="ban01" crumbs={[{ label: "Products", href: "/products" }]} />

      <Section className="bg-cream py-16 lg:py-24" aria-label="Product families">
        <Stagger as="ul" className="grid gap-6 md:grid-cols-2">
          {families.map((f) => {
            const img = getAsset(f.image);
            return (
              <StaggerItem as="li" key={f.id} id={f.id} className="scroll-mt-24">
                <a href={`#family-${f.id}`} className="group relative block overflow-hidden rounded-md bg-espresso text-cream shadow-card">
                  <Image src={assetSrc(img.id)} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[16/10] w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso via-espresso/80 to-transparent p-7 pt-20">
                    <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-white">{f.name}</h2>
                    <p className="mt-2 max-w-md text-cream/85">{f.tagline}</p>
                    <span className="eyebrow mt-4 inline-flex items-center gap-2 text-bronze">
                      {f.productSlugs.length} {f.productSlugs.length === 1 ? "product" : "products"} <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                </a>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {families.map((f) => (
        <Section key={f.id} id={`family-${f.id}`} className="border-t border-border bg-paper py-16 lg:py-24" aria-labelledby={`family-${f.id}-title`}>
          <SectionHeading id={`family-${f.id}-title`} eyebrow={f.name} title={f.id === "steel-liner" ? "Bolted steel, lined for potable water" : "Collapsible fabric tanks"} description={f.description.join(" ")} />
          <div className="mt-12 grid gap-16">
            {products
              .filter((p) => p.family === f.id)
              .map((p, i) => {
                const img = getAsset(p.images[0]);
                return (
                  <article key={p.slug} id={p.slug} className="scroll-mt-24">
                    <div className="grid gap-8 lg:grid-cols-12">
                      <Reveal as="figure" className={`overflow-hidden rounded-md lg:col-span-5 ${i % 2 ? "lg:order-2" : ""}`}>
                        <Link href={p.route} className="group block">
                          <Image src={assetSrc(img.id)} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                        </Link>
                      </Reveal>
                      <Reveal delay={0.1} className="lg:col-span-7">
                        <p className="eyebrow text-bronze-text">Series {p.series.join(" / ")}</p>
                        <h3 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold uppercase leading-[1.05] tracking-wide text-ink">
                          <Link href={p.route} className="hover:text-water">
                            {p.name}
                          </Link>
                        </h3>
                        <p className="mt-4 text-lg text-taupe-text">{p.summary}</p>
                        <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                          {p.keyFacts.slice(0, 6).map((k) => (
                            <div key={k.label} className="rounded-md bg-cream p-3">
                              <dt className="text-xs text-taupe-text">{k.label}</dt>
                              <dd className="font-display text-lg font-semibold text-ink">{k.value}</dd>
                            </div>
                          ))}
                        </dl>
                        <div className="mt-6 flex flex-wrap gap-3">
                          <Cta href={p.route}>Full product page</Cta>
                          <Cta href={`/contact?product=${p.slug}`} variant="outline">
                            Request a quote
                          </Cta>
                        </div>
                      </Reveal>
                    </div>
                    <Reveal className="mt-10">
                      <ProductTechnicalTabs product={p} />
                    </Reveal>
                  </article>
                );
              })}
          </div>
        </Section>
      ))}

      <EnquirySection />
    </>
  );
}
