import Image from "next/image";
import { Reveal, Stagger, StaggerItem, WordsReveal } from "@/components/shared/Reveal";
import { Parallax } from "@/components/shared/Parallax";
import { Counter } from "@/components/shared/Counter";
import { Cta } from "@/components/shared/Cta";
import { assetSrc, getAsset } from "@/lib/content";

/** Facts from the PWT brochure and the corrugated product page ("Ideal for remote areas"). */
const FIGURES = [
  { value: 1993, prefix: "", suffix: "", label: "First liner tanks introduced to the UAE", static: true },
  { value: 10, prefix: "", suffix: " yrs", label: "Genuine warranty on steel tanks" },
  { value: 6, prefix: "< ", suffix: " days", label: "To install a 500 m³ tank, no heavy lifting" },
];

/** "Built to last": a short statement and three figures over a slow parallax photograph. */
export function StatementBand({ showCta = true }: { showCta?: boolean }) {
  const photo = getAsset("corrugated-5");
  return (
    <section className="relative isolate overflow-hidden bg-espresso text-cream" aria-labelledby="statement-title">
      <Parallax amount={70} className="absolute inset-0 -z-10">
        <Image src={assetSrc(photo.id)} alt="" width={photo.width} height={photo.height} sizes="100vw" className="h-[125%] w-full -translate-y-[10%] object-cover opacity-35" />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-espresso via-espresso/80 to-espresso/40" aria-hidden="true" />
      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 sm:py-24 lg:py-28 xl:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal as="p" y={10} className="eyebrow flex items-center gap-3 text-bronze">
              <span className="h-px w-8 bg-bronze/60" aria-hidden="true" />
              Since 1993
            </Reveal>
            <h2 id="statement-title" className="heading-2 mt-4 max-w-[16ch] text-white">
              <WordsReveal text="Storage tanks built to last" />
            </h2>
          </div>
          <Reveal delay={0.15} className="lg:col-span-5">
            <p className="max-w-md text-[1.0625rem] leading-relaxed text-cream/80">The first liner tanks in the UAE and numerous projects across the region since, backed by our installation expertise and a genuine ten-year warranty.</p>
            {showCta ? (
              <Cta href="/about" variant="outlineLight" className="mt-6">
                Our story
              </Cta>
            ) : null}
          </Reveal>
        </div>
        <Stagger as="div" className="mt-14 grid gap-px overflow-hidden rounded-md bg-cream/15 sm:grid-cols-3">
          {FIGURES.map((f) => (
            <StaggerItem key={f.label} className="flex flex-col-reverse bg-espresso/70 p-6 backdrop-blur-sm sm:p-8">
              <p className="mt-2 max-w-[24ch] text-sm leading-snug text-cream/75">{f.label}</p>
              <p className="font-display text-4xl font-semibold text-white lg:text-5xl">
                {"static" in f ? f.value : <Counter value={f.value} prefix={f.prefix} suffix={f.suffix} duration={1.4} />}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
