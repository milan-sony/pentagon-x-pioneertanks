import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";
import { Cta } from "@/components/shared/Cta";
import { assetSrc, getAsset, getNewsArticles, getPage } from "@/lib/content";

const page = getPage("news");
export const metadata: Metadata = { title: page.title, description: "News and updates from Pioneer Water Tanks." };

export default function NewsPage() {
  const articles = getNewsArticles();
  return (
    <>
      <PageHero title={page.title} eyebrow="Company news" intro="Updates from Pioneer Water Tanks LLC, Abu Dhabi." image="news-banner" crumbs={[{ label: "News", href: "/news" }]} />
      <Section className="bg-cream py-16 lg:py-24" aria-labelledby="news-list-title">
        <SectionHeading id="news-list-title" eyebrow="Latest" title={`${articles.length} ${articles.length === 1 ? "article" : "articles"}`} description="Follow Pioneer on Facebook and Twitter for day-to-day updates; longer announcements are published here." />
        <Stagger as="ul" className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((n) => {
            const img = n.image ? getAsset(n.image) : null;
            return (
              <StaggerItem as="li" key={n.slug}>
                <Link href={n.route} className="group block">
                  {img ? (
                    <div className="overflow-hidden rounded-md">
                      <Image src={assetSrc(img.id)} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1024px) 33vw, 100vw" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                    </div>
                  ) : null}
                  <p className="eyebrow mt-5 text-taupe-text">
                    {n.dateLabel} {n.isoDate?.slice(0, 4)}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-bold uppercase leading-tight tracking-wide text-ink group-hover:text-water">{n.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-taupe-text">{n.excerpt}</p>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
        <Cta href="/contact" variant="outline" className="mt-12">
          Ask about a project
        </Cta>
      </Section>
    </>
  );
}
