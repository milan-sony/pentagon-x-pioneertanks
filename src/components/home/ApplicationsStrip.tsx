import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Marquee } from "@/components/shared/Marquee";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";
import { getApplications, getProduct } from "@/lib/content";

/** Applications as a continuous strip plus the four engineering features as a staggered grid. */
export function ApplicationsStrip() {
  const apps = getApplications();
  const corrugated = getProduct("corrugated-zincalum-steel")!;
  const features = corrugated.features.filter((f) => ["Rigid construction", "High corrosion resistance", "Size flexibility", "Ideal for remote areas"].includes(f.title));
  return (
    <Section id="applications" className="bg-cream py-20 lg:py-28" aria-labelledby="apps-title">
      <SectionHeading id="apps-title" eyebrow="Applications" title="Where Pioneer tanks are used" description="Potable water, effluent, treated waste water, brackish water and sea water in steel liner tanks; water and diesel in flexible tanks. Camps, fire protection, mining, irrigation, desalination, aquaculture and relief operations." />
      <Marquee
        label="Applications served"
        className="mt-10 border-y border-border py-5"
        items={apps.map((a) => (
          <span key={a.id} className="font-display text-2xl font-bold uppercase tracking-wide text-ink/80">
            {a.name}
            <span className="ml-10 text-bronze" aria-hidden="true">
              ◆
            </span>
          </span>
        ))}
      />
      <Stagger as="ul" className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <StaggerItem as="li" key={f.title} className="rounded-md border border-border bg-paper p-6 shadow-card">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-ink">{f.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-taupe-text">{f.body}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
