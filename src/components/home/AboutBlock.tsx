import Image from "next/image";
import { Section } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { Counter } from "@/components/shared/Counter";
import { Cta } from "@/components/shared/Cta";
import { assetSrc, company, getAsset, getCompanyStats, getPage } from "@/lib/content";

/** About block: photo left, eyebrow + uppercase statement centre, paragraph + signature-style tagline right; stats row beneath. */
export function AboutBlock() {
  const photo = getAsset("intro-img");
  const about = getPage("about");
  const intro = about.sections.find((s) => s.id === "introduction")!;
  const stats = getCompanyStats();
  return (
    <Section id="about" className="bg-cream py-20 lg:py-28" aria-labelledby="about-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal as="figure" x={-24} className="overflow-hidden rounded-md lg:col-span-4">
          <Image src={assetSrc(photo.id)} alt={photo.alt} width={photo.width} height={photo.height} sizes="(min-width: 1024px) 30vw, 100vw" className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4">
          <p className="eyebrow text-bronze-text">About us</p>
          <h2 id="about-title" className="mt-4 font-display text-[clamp(2rem,3.6vw,3.25rem)] font-bold uppercase leading-[1.02] tracking-wide text-ink">
            The first to bring liner tanks to the UAE
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="lg:col-span-4">
          <p className="leading-relaxed text-taupe-text">{intro.body?.[0]}</p>
          <p className="mt-6 font-display text-2xl font-semibold uppercase tracking-wide text-ink">{company.tagline}</p>
          <p className="text-sm text-taupe-text">{company.legalName}, {company.location}</p>
          <Cta href="/about" variant="outline" className="mt-6">
            About the company
          </Cta>
        </Reveal>
      </div>
      <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-10 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <dt className="order-2 mt-2 text-sm text-taupe-text">{s.label}</dt>
            <dd className="font-display text-5xl font-bold text-ink lg:text-6xl">
              <Counter value={s.value} suffix={s.suffix} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
