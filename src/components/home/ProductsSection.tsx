import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { Cta } from "@/components/shared/Cta";
import { getAsset, getProductFamilies, getProducts } from "@/lib/content";

/** Product families and products as an auto-scrolling strip of image cards. */
export function ProductsSection() {
  const families = getProductFamilies();
  const products = getProducts();
  const familyImages = new Set(families.map((f) => f.image));
  const cards = [
    ...products.map((p) => ({
      href: p.route,
      kicker: families.find((f) => f.id === p.family)?.name ?? "Product",
      title: p.shortName,
      subtitle: p.keyFacts.slice(0, 2).map((k) => `${k.label}: ${k.value}`).join(" · "),
      image: getAsset(p.images.find((id) => !familyImages.has(id)) ?? p.images[0]),
    })),
    ...families.map((f) => ({ href: `/products#family-${f.id}`, kicker: "Product family", title: f.name, subtitle: f.tagline, image: getAsset(f.image) })),
  ];
  return (
    <Section id="products" className="overflow-hidden bg-paper py-20 sm:py-24 lg:py-32" aria-labelledby="products-title">
      <SectionHeading id="products-title" eyebrow="Our products" title="Storage built for the Gulf" description="Bolted steel liner tanks in corrugated Zincalume or flat-panel galvanised steel, and flexible fabric tanks for water and diesel." />
      <Reveal className="mt-12">
        <ProductCarousel cards={cards} label="Products and product families" />
      </Reveal>
      <Reveal className="mt-10">
        <Cta href="/products" variant="dark">
          All products and specifications
        </Cta>
      </Reveal>
    </Section>
  );
}
