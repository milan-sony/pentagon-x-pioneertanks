import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { Cta } from "@/components/shared/Cta";
import { assetSrc, getAsset, getNewsArticle, getNewsArticles, newsRouteSlug } from "@/lib/content";

export function generateStaticParams() {
  return getNewsArticles().map((n) => ({ slug: newsRouteSlug(n.route) }));
}

// Every slug is prerendered by generateStaticParams, and unknown slugs must still 404,
// so this page awaits `params` outside <Suspense> and is allowed to block on navigation.
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const n = getNewsArticle(slug);
  return { title: n?.title ?? "News", description: n?.excerpt };
}

export default async function NewsArticlePage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const n = getNewsArticle(slug);
  if (!n) notFound();
  const img = n.image ? getAsset(n.image) : null;
  return (
    <>
      <PageHero title={n.title} eyebrow={`News · ${n.dateLabel} ${n.isoDate?.slice(0, 4) ?? ""}`} image="news-banner" crumbs={[{ label: "News", href: "/news" }, { label: n.title, href: n.route }]} />
      <Section className="bg-cream py-16 lg:py-24" aria-label="Article">
        <div className="mx-auto max-w-3xl">
          {img ? (
            <Reveal as="figure" className="overflow-hidden rounded-md">
              <Image src={assetSrc(img.id)} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 768px) 768px, 100vw" className="w-full object-cover" />
            </Reveal>
          ) : null}
          <Reveal delay={0.1} className="mt-8 grid gap-5 text-lg leading-relaxed text-ink/85">
            {n.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <Cta href="/news" variant="outline" className="mt-10" arrow={false}>
            Back to news
          </Cta>
        </div>
      </Section>
    </>
  );
}
