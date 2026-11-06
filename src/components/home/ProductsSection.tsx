import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { Cta } from "@/components/shared/Cta";
import { getAsset, getProductFamilies, getProducts } from "@/lib/content";

/** Families and products as image-overlay cards in a scrollable strip. */
export function ProductsSection() {
  const families = getProductFamilies();
  const products = getProducts();
  const familyImages = new Set(families.map((f) => f.image));
  const cards = [
    ...families.map((f) => ({ href: `/products#${f.id}`, title: f.name, subtitle: f.tagline, image: getAsset(f.image) })),
    ...products.map((p) => ({ href: p.route, title: p.shortName, subtitle: p.keyFacts.slice(0, 2).map((k) => `${k.label}: ${k.value}`).join(" · "), image: getAsset(p.images.find((id) => !familyImages.has(id)) ?? p.images[0]) })),
  ];
  return (
    <Section id="products" className="bg-paper py-20 lg:py-28" aria-labelledby="products-title">
      <SectionHeading id="products-title" eyebrow="Our products" title="Storage built for the Gulf" description="Cylindrical bolted steel liner tanks – corrugated Zincalume or flat-panel galvanised – and custom flexible fabric tanks for water and diesel. Every product below links to its full specification." />
      <Reveal className="mt-10">
        <ProductCarousel cards={cards} label="Product families and products" />
      </Reveal>
      <Reveal className="mt-6">
        <Cta href="/products" variant="dark">
          All products and specifications
        </Cta>
      </Reveal>
    </Section>
  );
}
