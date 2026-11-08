import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsArticle, getNewsArticles, newsRouteSlug } from "@/lib/content";

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

/** Baseline news article – themes replace this file. */
export default async function NewsArticlePage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const n = getNewsArticle(slug);
  if (!n) notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm">
        {n.dateLabel}
        {n.isoDate ? ` ${n.isoDate.slice(0, 4)}` : ""}
      </p>
      <h1 className="text-4xl font-bold">{n.title}</h1>
      {n.body.map((p) => (
        <p key={p} className="mt-4">
          {p}
        </p>
      ))}
    </article>
  );
}
