import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MaskReveal, Reveal } from "@/components/shared/Reveal";
import { Cta } from "@/components/shared/Cta";
import { assetSrc, getGallery } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Bento of four installation photographs: one large, three small, each opening the gallery. */
export function GalleryPreview() {
  const groups = getGallery();
  // Source photos are about 700 px wide, so no tile is laid out much wider than that.
  const tiles = [
    { group: groups[0], asset: groups[0].assets[4], cls: "sm:col-span-2 lg:col-span-6 lg:row-span-2", aspect: "aspect-[4/3] lg:aspect-auto lg:h-full" },
    { group: groups[1], asset: groups[1].assets[0], cls: "sm:col-span-2 lg:col-span-6", aspect: "aspect-[16/9]" },
    { group: groups[2], asset: groups[2].assets[0], cls: "lg:col-span-3", aspect: "aspect-[4/3]" },
    { group: groups[3], asset: groups[3].assets[1], cls: "lg:col-span-3", aspect: "aspect-[4/3]" },
  ];
  const total = groups.reduce((n, g) => n + g.assets.length, 0);
  return (
    <Section id="gallery" className="bg-paper py-20 sm:py-24 lg:py-32" aria-labelledby="gallery-title">
      <SectionHeading id="gallery-title" eyebrow="Installations" title="Tanks in the field" description={`Steel liner and flexible tanks on site and in our Abu Dhabi workshop. ${total} photographs in the full gallery.`} />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        {tiles.map((t, i) => (
          <li key={t.asset.id} className={t.cls}>
            <MaskReveal delay={i * 0.08} className="h-full overflow-hidden rounded-md">
              <Link href="/gallery" className="group relative block h-full overflow-hidden rounded-md bg-espresso">
                <Image src={assetSrc(t.asset.id)} alt={t.asset.alt} width={t.asset.width} height={t.asset.height} sizes={i < 2 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"} className={cn("w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]", t.aspect)} />
                <span className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                <span className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-cream/95 px-3.5 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-ink">{t.group.name}</span>
                  <span className="inline-flex size-10 translate-y-2 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden="true">
                    <ArrowUpRight className="size-5" />
                  </span>
                </span>
              </Link>
            </MaskReveal>
          </li>
        ))}
      </ul>
      <Reveal className="mt-10">
        <Cta href="/gallery" variant="outline">
          View the gallery
        </Cta>
      </Reveal>
    </Section>
  );
}
