import type { Metadata } from "next";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { GalleryGrid } from "@/components/shared/GalleryGrid";
import { Cta } from "@/components/shared/Cta";
import { getGallery, getPage } from "@/lib/content";

const page = getPage("gallery");
export const metadata: Metadata = { title: page.title, description: "Sixteen photographs of Pioneer corrugated, flat panel, pillow and onion tanks on site and in the workshop." };

export default function GalleryPage() {
  const groups = getGallery();
  const total = groups.reduce((n, g) => n + g.assets.length, 0);
  return (
    <>
      <PageHero title={page.title} eyebrow={`${total} photographs · ${groups.length} categories`} intro="Corrugated and flat panel steel liner tanks installed across the UAE, and pillow and onion flexible tanks under test in the Pioneer workshop." image="gallery-banner" crumbs={[{ label: "Gallery", href: "/gallery" }]} />
      <Section className="bg-cream py-16 lg:py-24" aria-labelledby="gallery-grid-title">
        <SectionHeading id="gallery-grid-title" eyebrow="Media gallery" title="Tanks on site" description="Filter by tank type. Open any photograph to view it full size and move through the set with the arrow keys." />
        <Reveal className="mt-10">
          <GalleryGrid groups={groups} classNames={{ filterButton: "rounded-md border border-ink/20 text-ink hover:border-water hover:text-water eyebrow", filterButtonActive: "bg-espresso text-cream border-espresso", caption: "eyebrow text-taupe-text", tile: "rounded-md" }} />
        </Reveal>
        <Cta href="/products" variant="outline" className="mt-12">
          See the products
        </Cta>
      </Section>
    </>
  );
}
