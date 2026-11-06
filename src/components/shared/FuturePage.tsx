import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { PageContent } from "@/types/content";
import { cn } from "@/lib/utils";

export interface FuturePageProps {
  page: PageContent;
  /** One-paragraph summary of what the page will hold (from the extracted content). */
  summary: string;
  /** Optional preview content a branch wants to render (e.g. product key facts). */
  children?: React.ReactNode;
  classNames?: { section?: string; title?: string; badge?: string; link?: string };
}

/**
 * Honest placeholder for routes that are in the navigation but not part of this
 * phase. It names the page, says it is planned, links to the current live page
 * and back to the implemented pages. It is never a redirect and never a 404.
 */
export function FuturePage({ page, summary, children, classNames = {} }: FuturePageProps) {
  return (
    <section className={cn("mx-auto w-full max-w-3xl px-4 py-20 sm:px-6", classNames.section)} aria-labelledby="future-page-title">
      <p className={cn("mb-4 inline-block text-xs font-semibold uppercase tracking-widest", classNames.badge)} data-testid="future-page-badge">
        Planned for phase 2
      </p>
      <h1 id="future-page-title" className={cn("text-4xl font-bold", classNames.title)}>
        {page.title}
      </h1>
      <p className="mt-6 text-lg leading-relaxed">{summary}</p>
      <p className="mt-4 text-sm opacity-80">
        This page is part of the full redesign but is not included in the current design-approval build. Its content has already been extracted and is ready for implementation.
      </p>
      {children ? <div className="mt-10">{children}</div> : null}
      <div className="mt-10 flex flex-wrap gap-6 text-sm font-semibold">
        <Link href="/" className={cn("inline-flex items-center gap-2 underline-offset-4 hover:underline", classNames.link)}>
          <ArrowLeft className="size-4" aria-hidden="true" /> Back to home
        </Link>
        <Link href="/products" className={cn("inline-flex items-center gap-2 underline-offset-4 hover:underline", classNames.link)}>
          View products
        </Link>
        <a href={page.sourceUrl} target="_blank" rel="noopener noreferrer" className={cn("inline-flex items-center gap-2 underline-offset-4 hover:underline", classNames.link)}>
          See the current live page <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
