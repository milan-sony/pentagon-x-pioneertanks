import Image from "next/image";
import { Entrance } from "@/components/shared/Reveal";
import { Parallax } from "@/components/shared/Parallax";
import { Cta } from "@/components/shared/Cta";
import { assetSrc, company, getAsset } from "@/lib/content";

/**
 * Full-width photographic hero with a two-line uppercase headline set on
 * opposite edges, intro paragraph and two CTAs.
 */
export function Hero() {
  const photo = getAsset("product-banner");
  return (
    <section className="relative isolate overflow-hidden bg-espresso text-cream" aria-labelledby="hero-title">
      <Parallax amount={40} className="absolute inset-0 -z-10">
        <Image src={assetSrc(photo.id)} alt="" width={photo.width} height={photo.height} priority quality={72} sizes="100vw" className="h-[120%] w-full -translate-y-[8%] object-cover object-[60%_center]" />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-espresso/30 via-espresso/35 to-espresso" aria-hidden="true" />
      <div className="mx-auto flex min-h-[calc(100svh-76px)] max-w-[1400px] flex-col justify-end px-4 pb-14 pt-32 sm:px-6 lg:pb-20 xl:px-10">
        <h1 id="hero-title" className="font-display text-[clamp(2.6rem,7.2vw,7rem)] font-bold uppercase leading-[0.98] tracking-wide text-white">
          <Entrance as="span" y={28} className="block">
            Pioneers in water
          </Entrance>
          <Entrance as="span" y={28} delay={0.12} className="block lg:text-right">
            storage solutions
          </Entrance>
        </h1>
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <Entrance delay={0.25} className="lg:col-span-6">
            <p className="max-w-xl text-lg leading-relaxed text-cream/85">
              {company.description} Bolted steel liner tanks up to 3,300 m³ and flexible fabric tanks up to 300 m³, manufactured in Abu Dhabi.
            </p>
          </Entrance>
          <Entrance delay={0.35} className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end">
            <Cta href="/products">Explore products</Cta>
            <Cta href="/contact" variant="outlineLight">
              Request a quote
            </Cta>
          </Entrance>
        </div>
      </div>
    </section>
  );
}
