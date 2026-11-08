import Image from "next/image";
import { Section } from "@/components/shared/Section";
import { MaskReveal, Reveal, Stagger, StaggerItem, WordsReveal } from "@/components/shared/Reveal";
import { Parallax } from "@/components/shared/Parallax";
import { Counter } from "@/components/shared/Counter";
import { Cta } from "@/components/shared/Cta";
import { assetSrc, getAsset, getCompanyStats, getPage } from "@/lib/content";

/** First `n` sentences of a paragraph, for short home-page copy. */
function sentences(text: string | undefined, n: number) {
  return (text ?? "").split(/(?<=\.)\s+/).slice(0, n).join(" ");
}

/** About: photo with a mask reveal and slight drift, a short statement, the figures counting up. */
export function AboutBlock() {
  const photo = getAsset("intro-img");
  const about = getPage("about");
  const intro = about.sections.find((s) => s.id === "introduction")!;
  const stats = getCompanyStats();
  return (
    <Section id="about" className="bg-cream py-20 sm:py-24 lg:py-32" aria-labelledby="about-title">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <MaskReveal className="overflow-hidden rounded-md lg:col-span-5">
          <Parallax amount={24} className="aspect-[4/5] w-full">
            <Image src={assetSrc(photo.id)} alt={photo.alt} width={photo.width} height={photo.height} sizes="(min-width: 1024px) 40vw, 100vw" className="h-[112%] w-full -translate-y-[6%] object-cover" />
          </Parallax>
        </MaskReveal>
        <div className="lg:col-span-7">
          <Reveal as="p" y={10} className="eyebrow flex items-center gap-3 text-bronze-text">
            <span className="h-px w-8 bg-bronze-text/50" aria-hidden="true" />
            About us
          </Reveal>
          <h2 id="about-title" className="heading-2 mt-4 max-w-[18ch] text-ink">
            <WordsReveal text="The first to bring liner tanks to the UAE" />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-taupe-text">{sentences(intro.body?.[0], 2)}</p>
            <Cta href="/about" variant="outline" className="mt-8">
              About the company
            </Cta>
          </Reveal>
          <Stagger as="div" className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-border pt-10 sm:grid-cols-4">
            {stats.map((s) => (
              <StaggerItem key={s.label} className="flex flex-col-reverse">
                <p className="mt-2 text-sm leading-snug text-taupe-text">{s.label}</p>
                <p className="font-display text-4xl font-semibold text-ink lg:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
