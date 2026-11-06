import Image from "next/image";
import { Reveal } from "@/components/shared/Reveal";
import { Parallax } from "@/components/shared/Parallax";
import { assetSrc, getAsset } from "@/lib/content";

/** Dark photographic band with a large statement. The statement is the brochure's own wording. */
export function StatementBand() {
  const photo = getAsset("corrugated-5");
  return (
    <section className="relative isolate overflow-hidden bg-espresso text-cream" aria-labelledby="statement-title">
      <Parallax amount={30} className="absolute inset-0 -z-10">
        <Image src={assetSrc(photo.id)} alt="" width={photo.width} height={photo.height} sizes="100vw" className="h-[120%] w-full -translate-y-[8%] object-cover opacity-40" />
      </Parallax>
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-24 sm:px-6 lg:grid-cols-12 lg:py-32 xl:px-10">
        <Reveal className="lg:col-span-3">
          <p className="eyebrow text-bronze">Built to last</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-9">
          <h2 id="statement-title" className="font-display text-[clamp(1.75rem,3.4vw,3rem)] font-bold uppercase leading-[1.1] tracking-wide text-white">
            Pioneer Water Tanks LLC were the first to introduce liner tanks to the UAE market in 1993 and have since successfully installed numerous projects in this region. With our installation expertise and a genuine 10 year warranty, Pioneer storage tanks are built-to-last.
          </h2>
          <p className="mt-6 text-sm text-cream/70">From the PWT company brochure</p>
        </Reveal>
      </div>
    </section>
  );
}
