import Image from "next/image";
import Link from "next/link";
import { FileDown, Newspaper, BadgeCheck } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";
import { assetSrc, getAsset, getCertifications, getDownloads, getNewsArticles } from "@/lib/content";

/** Three editorial cards: brochure, licences, latest news. */
export function ResourcesSection() {
  const brochure = getDownloads().find((d) => d.type === "brochure")!;
  const datasheets = getDownloads().filter((d) => d.type === "datasheet");
  const certs = getCertifications();
  const news = getNewsArticles()[0];
  const newsImg = news.image ? getAsset(news.image) : null;
  const cards = [
    {
      href: brochure.localPath,
      download: true,
      icon: FileDown,
      kicker: `PDF · ${brochure.pages} pages`,
      title: brochure.title,
      body: `${brochure.summary.split(";")[0]}. Plus ${datasheets.length} technical datasheets on the downloads page.`,
      image: getAsset("corrugated-2"),
    },
    {
      href: "/licenses",
      icon: BadgeCheck,
      kicker: `${certs.length} documents`,
      title: "Licences, ISO certificate and warranty",
      body: certs.map((c) => c.name).join(" · "),
      image: getAsset("pwt-iso-certificate"),
    },
    {
      href: news.route,
      icon: Newspaper,
      kicker: `${news.dateLabel} ${news.isoDate?.slice(0, 4) ?? ""}`,
      title: news.title,
      body: news.excerpt,
      image: newsImg ?? getAsset("site-img"),
    },
  ];
  return (
    <Section id="resources" className="bg-cream py-20 lg:py-28" aria-labelledby="resources-title">
      <SectionHeading id="resources-title" eyebrow="Resources" title="Brochure, documents and news" description="Download the company brochure and datasheets, review the published licences, and read the latest update." />
      <Stagger as="ul" className="mt-10 grid gap-6 md:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          const inner = (
            <>
              <div className="overflow-hidden rounded-md">
                <Image src={assetSrc(c.image.id, "card")} alt={c.image.alt} width={c.image.width} height={c.image.height} sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
              </div>
              <p className="mt-5 flex items-center gap-2 text-xs text-taupe-text">
                <Icon className="size-4 text-bronze-text" aria-hidden="true" />
                {c.kicker}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold uppercase leading-tight tracking-wide text-ink group-hover:text-water">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-taupe-text">{c.body}</p>
            </>
          );
          return (
            <StaggerItem as="li" key={c.title}>
              {c.download ? (
                <a href={c.href} download className="group block">
                  {inner}
                </a>
              ) : (
                <Link href={c.href} className="group block">
                  {inner}
                </Link>
              )}
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
