import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { ProductFacts, ProductGallery, ProductTechnicalTabs } from "@/components/products/ProductDetailBlocks";
import { EnquirySection } from "@/components/home/EnquirySection";
import { getProduct, getProductFamilies, getProducts } from "@/lib/content";

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product ? product.name : "Product", description: product?.summary };
}

export default async function ProductDetailPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const family = getProductFamilies().find((f) => f.id === product.family)!;
  const others = getProducts().filter((p) => p.slug !== product.slug);
  return (
    <>
      <PageHero title={product.name} eyebrow={`${family.name} · Series ${product.series.join(" / ")}`} intro={product.summary} image={product.images[0]} crumbs={[{ label: "Products", href: "/products" }, { label: product.shortName, href: product.route }]} size="tall" />

      <Section className="bg-cream py-16 lg:py-24" aria-label="Overview">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-bronze-text">Overview</p>
            <div className="mt-4 grid gap-5 text-lg leading-relaxed text-ink/85">
              {product.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {product.verificationNotes.length ? <p className="mt-6 text-xs text-taupe-text">Source: {product.sourceUrl} and the named datasheets. Items marked “datasheet” come from the PDF documents.</p> : null}
          </Reveal>
          <div className="lg:col-span-5">
            <ProductFacts product={product} />
          </div>
        </div>
      </Section>

      <Section className="border-t border-border bg-paper py-16 lg:py-24" aria-labelledby="tech-title">
        <SectionHeading id="tech-title" eyebrow="Technical" title="Specification and features" description="Everything published for this product, with the source of each value." />
        <Reveal className="mt-10">
          <ProductTechnicalTabs product={product} />
        </Reveal>
      </Section>

      <Section className="bg-cream py-16 lg:py-24" aria-labelledby="gallery-title">
        <SectionHeading id="gallery-title" eyebrow="Photographs" title={`${product.shortName} in the field`} />
        <div className="mt-10">
          <ProductGallery product={product} />
        </div>
      </Section>

      <Section className="border-t border-border bg-paper py-12" aria-label="Other products">
        <p className="eyebrow text-taupe-text">Other products</p>
        <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={o.route} className="font-display text-lg font-bold uppercase tracking-wide text-ink hover:text-water">
                {o.shortName}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/products" className="font-display text-lg font-bold uppercase tracking-wide text-water hover:underline">
              All products
            </Link>
          </li>
        </ul>
      </Section>

      <EnquirySection defaultProduct={product.shortName} heading={`Enquire about ${product.shortName}`} />
    </>
  );
}
