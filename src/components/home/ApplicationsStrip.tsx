import Link from "next/link";
import { ArrowUpRight, Blocks, Ruler, ShieldCheck, Truck, type LucideIcon } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Marquee } from "@/components/shared/Marquee";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";
import { getApplications, getProduct } from "@/lib/content";

const FEATURES: { title: string; icon: LucideIcon }[] = [
  { title: "Rigid construction", icon: Blocks },
  { title: "High corrosion resistance", icon: ShieldCheck },
  { title: "Size flexibility", icon: Ruler },
  { title: "Ideal for remote areas", icon: Truck },
];

/** Applications as a slow strip, then four engineering features as short linked cards. */
export function ApplicationsStrip() {
  const apps = getApplications();
  const corrugated = getProduct("corrugated-zincalum-steel")!;
  const features = FEATURES.map((f) => {
    const body = corrugated.features.find((x) => x.title === f.title)?.body ?? "";
    return { ...f, summary: body.split(/(?<=\.)\s+/)[0] };
  });
  return (
    <Section id="applications" className="bg-cream py-20 sm:py-24 lg:py-32" aria-labelledby="apps-title">
      <SectionHeading id="apps-title" eyebrow="Applications" title="Where Pioneer tanks are used" description="Potable, brackish and sea water, effluent and treated waste water in steel liner tanks; water and diesel in flexible tanks." />
      <Marquee
        label="Applications served"
        duration={55}
        className="mt-12 border-y border-border py-6"
        items={apps.map((a) => (
          <span key={a.id} className="flex items-center gap-10 font-display text-xl font-medium uppercase tracking-[0.06em] text-ink/80 sm:text-2xl">
            {a.name}
            <span className="size-1.5 rounded-full bg-bronze" aria-hidden="true" />
          </span>
        ))}
      />
      <Stagger as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <StaggerItem as="li" key={f.title} className="group relative flex flex-col rounded-md border border-border bg-paper p-6 transition-[translate,scale,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-water/40 hover:shadow-card">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-water/10 text-water transition-colors duration-300 group-hover:bg-water group-hover:text-white" aria-hidden="true">
                <Icon className="size-5" />
              </span>
              <h3 className="heading-3 mt-6 text-ink">
                <Link href={`${corrugated.route}#tech-title`} className="after:absolute after:inset-0 after:rounded-md focus-visible:outline-none focus-visible:after:ring-4 focus-visible:after:ring-ring">
                  {f.title}
                </Link>
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-taupe-text">{f.summary}</p>
              <ArrowUpRight className="mt-5 size-5 text-water transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
