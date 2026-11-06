import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";
import { Cta } from "@/components/shared/Cta";
import { assetSrc, getGallery } from "@/lib/content";

/** Two large project tiles + two small (reference: Intrio latest projects), drawn from the gallery groups. */
export function GalleryPreview() {
  const groups = getGallery();
  const tiles = [
    { group: groups[0], asset: groups[0].assets[4] },
    { group: groups[1], asset: groups[1].assets[0] },
    { group: groups[2], asset: groups[2].assets[0] },
    { group: groups[3], asset: groups[3].assets[1] },
  ];
  return (
    <Section id="gallery" className="bg-paper py-20 lg:py-28" aria-labelledby="gallery-title">
      <SectionHeading id="gallery-title" eyebrow="Installations" title="Tanks in the field" description="Corrugated and flat-panel steel tanks, pillow and onion flexible tanks photographed on site and in the Pioneer workshop. Open the gallery for all sixteen images." />
      <Stagger as="ul" className="mt-10 grid gap-5 md:grid-cols-2">
        {tiles.map((t, i) => (
          <StaggerItem as="li" key={t.asset.id} className={i < 2 ? "md:col-span-1" : "md:col-span-1"}>
            <Link href="/gallery" className="group relative block overflow-hidden rounded-md bg-espresso">
              <Image src={assetSrc(t.asset.id)} alt={t.asset.alt} width={t.asset.width} height={t.asset.height} sizes="(min-width: 768px) 50vw, 100vw" className={`${i < 2 ? "aspect-[16/10]" : "aspect-[16/8]"} w-full object-cover opacity-95 transition-transform duration-700 group-hover:scale-[1.04]`} />
              <span className="absolute left-5 top-5 rounded-md bg-cream/95 px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-ink">{t.group.name}</span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
      <Cta href="/gallery" variant="outline" className="mt-8">
        View the gallery
      </Cta>
    </Section>
  );
}
