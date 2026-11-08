import Image from "next/image";
import { Entrance, WordsReveal } from "@/components/shared/Reveal";
import { Parallax } from "@/components/shared/Parallax";
import { Cta } from "@/components/shared/Cta";
import { HeroZoom } from "@/components/home/HeroZoom";
import { assetSrc, getAsset } from "@/lib/content";

const FACTS = [
  { value: "1993", label: "First liner tanks in the UAE" },
  { value: "3,300 m³", label: "Largest steel liner tank" },
  { value: "10 years", label: "Steel tank warranty" },
];

/**
 * Full-height photographic hero: the photo settles from a slow zoom and drifts with the scroll,
 * the two-line headline rises in word by word, then the intro, actions and three quick facts.
 */
export function Hero() {
  const photo = getAsset("product-banner");
  return (
    <section className="relative isolate overflow-hidden bg-espresso text-cream" aria-labelledby="hero-title">
      <Parallax amount={60} className="absolute inset-0 -z-10">
        <HeroZoom>
          <Image src={assetSrc(photo.id)} alt="" width={photo.width} height={photo.height} priority quality={72} sizes="100vw" className="h-[120%] w-full -translate-y-[8%] object-cover object-[60%_center]" />
        </HeroZoom>
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(29_24_20/0.55)_0%,rgb(29_24_20/0.45)_40%,rgb(43_33_27/0.94)_100%)]" aria-hidden="true" />

      <div className="mx-auto flex min-h-[calc(100svh-76px)] max-w-[1400px] flex-col justify-end px-4 pb-24 pt-28 sm:px-6 md:pb-12 lg:pb-14 xl:px-10">
        <Entrance as="p" y={12} className="eyebrow flex items-center gap-3 text-cream">
          <span className="h-px w-8 bg-bronze" aria-hidden="true" />
          Abu Dhabi · Since 1993
        </Entrance>
        <h1 id="hero-title" className="heading-1 mt-5 text-white">
          <WordsReveal text="Pioneers in water" trigger="load" delay={0.15} className="block" />
          <WordsReveal text="storage solutions" trigger="load" delay={0.35} className="block lg:text-right" />
        </h1>

        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:items-end">
          <Entrance delay={0.55} className="lg:col-span-6">
            <p className="max-w-lg text-[1.0625rem] leading-relaxed text-cream/85 sm:text-lg">Bolted steel liner tanks up to 3,300 m³ and flexible tanks up to 300 m³, made in Abu Dhabi for the UAE, the Gulf and the Middle East.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Cta href="/products">Explore products</Cta>
              <Cta href="/contact" variant="outlineLight">
                Request a quote
              </Cta>
            </div>
          </Entrance>
          <Entrance delay={0.7} className="lg:col-span-5 lg:col-start-8 lg:pr-20">
            <dl className="grid grid-cols-3 gap-4 border-t border-cream/20 pt-6">
              {FACTS.map((f) => (
                <div key={f.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs leading-snug text-cream/70 sm:text-sm">{f.label}</dt>
                  <dd className="font-display text-xl font-semibold text-white sm:text-2xl">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Entrance>
        </div>

        <a href="#about" className="group mt-10 hidden items-center gap-3 self-start text-xs uppercase tracking-[0.2em] text-cream/70 hover:text-white lg:inline-flex" aria-label="Scroll to the next section">
          <span className="relative h-10 w-6 rounded-full border border-cream/40" aria-hidden="true">
            <span className="absolute left-1/2 top-2 h-2 w-0.5 -translate-x-1/2 rounded-full bg-cream motion-safe:animate-[scroll-cue_1.8s_ease-in-out_3]" />
          </span>
          Scroll
        </a>
      </div>
    </section>
  );
}
