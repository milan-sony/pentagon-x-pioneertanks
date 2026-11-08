import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { Counter } from "@/components/shared/Counter";
import { Cta } from "@/components/shared/Cta";
import { StatementBand } from "@/components/home/StatementBand";
import { assetSrc, company, getAsset, getCertifications, getCompanyStats, getPage, getProduct } from "@/lib/content";

const page = getPage("about");
export const metadata: Metadata = { title: page.title, description: company.description };

export default function AboutPage() {
  const profile = page.sections.find((s) => s.id === "company-profile")!;
  const intro = page.sections.find((s) => s.id === "introduction")!;
  const whoWeAre = page.sections.find((s) => s.id === "brochure-who-we-are")!;
  const home = getPage("home");
  const expertise = home.sections.find((s) => s.id === "areas-of-expertise")!;
  const stats = getCompanyStats();
  const corrugated = getProduct("corrugated-zincalum-steel")!;
  const build = corrugated.features.filter((f) => ["Fibre reinforced liner", "Ring beam foundation", "Jacking system"].includes(f.title));
  const certs = getCertifications();
  const photo = getAsset("intro-img");
  const photo2 = getAsset("corrugated-7");

  return (
    <>
      <PageHero title={page.title} eyebrow={company.tagline} intro={profile.body?.[0]} image="about-banner" crumbs={[{ label: "About", href: "/about" }]} />

      {/* Company profile + introduction */}
      <Section className="bg-cream py-20 lg:py-28" aria-labelledby="profile-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal as="figure" x={-24} className="overflow-hidden rounded-md lg:col-span-5">
            <Image src={assetSrc(photo.id)} alt={photo.alt} width={photo.width} height={photo.height} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-square w-full object-cover" />
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-bronze-text">{profile.heading}</p>
              <h2 id="profile-title" className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold uppercase leading-[1.02] tracking-wide text-ink">
                Corrugated and flat bolted liner tanks, made in Abu Dhabi
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-ink/85">{profile.body?.[0]}</p>
              <p className="eyebrow mt-8 text-bronze-text">{intro.heading}</p>
              <p className="mt-3 leading-relaxed text-taupe-text">{intro.body?.[0]}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dd className="font-display text-4xl font-semibold text-ink">
                      <Counter value={s.value} suffix={s.suffix} />
                    </dd>
                    <dt className="mt-1 text-xs text-taupe-text">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Mission, vision, philosophy, values */}
      <Section className="border-t border-border bg-paper py-20 lg:py-28" aria-labelledby="mission-title">
        <SectionHeading id="mission-title" eyebrow="Mission & vision" title="Why the company exists" description={expertise.body?.[0]} />
        <Stagger as="ul" className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { k: "Our mission", v: company.mission },
            { k: "Our vision", v: company.vision },
            { k: "Philosophy", v: company.philosophy },
            { k: "Values", v: company.values },
          ].map((item) => (
            <StaggerItem as="li" key={item.k} className="rounded-md border border-border bg-cream p-6">
              <h3 className="eyebrow text-bronze-text">{item.k}</h3>
              <p className="mt-3 font-display text-xl font-semibold leading-snug text-ink">{item.v}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <StatementBand showCta={false} />

      {/* Who we are + how a tank is built */}
      <Section className="bg-cream py-20 lg:py-28" aria-labelledby="who-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="who-title" eyebrow="Who we are" title="Modular bolted steel liner tanks for the UAE, Gulf and MENA" align="left" />
            <Reveal delay={0.1} className="mt-6 grid gap-4 leading-relaxed text-ink/85">
              {whoWeAre.body?.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
            <Reveal as="figure" className="mt-8 overflow-hidden rounded-md">
              <Image src={assetSrc(photo2.id)} alt={photo2.alt} width={photo2.width} height={photo2.height} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover" />
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow text-bronze-text">Engineering and manufacturing</p>
              <h3 className="mt-3 font-display text-2xl font-semibold uppercase tracking-wide text-ink">How a Pioneer tank is built</h3>
            </Reveal>
            <Stagger as="ol" className="mt-6 grid gap-5">
              {build.map((f) => (
                <StaggerItem as="li" key={f.title} className="rounded-md bg-paper p-6 shadow-card">
                  <h4 className="font-display text-lg font-semibold uppercase tracking-wide text-ink">{f.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-taupe-text">{f.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      {/* Licences summary */}
      <Section className="border-t border-border bg-paper py-20 lg:py-28" aria-labelledby="licences-title">
        <SectionHeading id="licences-title" eyebrow="Licences" title="Licensed, certified, warranted" description="Our ISO 9001 certificate, Abu Dhabi commercial licence and ten-year tank warranty." />
        <Stagger as="ul" className="mt-10 grid gap-6 sm:grid-cols-3">
          {certs.map((c) => {
            const img = getAsset(c.image);
            return (
              <StaggerItem as="li" key={c.id} className="rounded-md bg-cream p-3 shadow-card">
                <Image src={assetSrc(img.id)} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 640px) 30vw, 100vw" className="aspect-[500/732] w-full rounded-sm object-cover object-top" />
                <h3 className="mt-4 font-display text-base font-semibold uppercase leading-tight tracking-wide text-ink">{c.name}</h3>
              </StaggerItem>
            );
          })}
        </Stagger>
        <Cta href="/licenses" variant="outline" className="mt-8">
          View licences
        </Cta>
      </Section>
    </>
  );
}
