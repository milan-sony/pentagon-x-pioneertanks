import type { Metadata } from "next";
import Link from "next/link";
import { getNewsArticles, getPage } from "@/lib/content";

const page = getPage("news");
export const metadata: Metadata = { title: page.title, description: "News and updates from Pioneer Water Tanks." };

/** Baseline News page – themes replace this file. */
export default function NewsPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold">{page.title}</h1>
      <ul className="mt-10 grid gap-6">
        {getNewsArticles().map((n) => (
          <li key={n.slug} className="border p-4">
            <p className="text-sm">
              {n.dateLabel}
              {n.isoDate ? ` ${n.isoDate.slice(0, 4)}` : ""}
            </p>
            <h2 className="text-xl font-semibold">
              <Link href={n.route} className="underline">
                {n.title}
              </Link>
            </h2>
            <p className="mt-2">{n.excerpt}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
