"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Home, PauseCircle } from "lucide-react";

const SECONDS = 3;

/**
 * Counts down and returns the visitor to the home page. A visible "Stay on this page" button
 * cancels the redirect (WCAG 2.2.1 Timing Adjustable). The live region announces the redirect
 * once and the cancellation once, not every second.
 */
export function NotFoundRedirect() {
  const router = useRouter();
  const [left, setLeft] = useState(SECONDS);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (cancelled) return;
    if (left <= 0) {
      router.replace("/");
      return;
    }
    const t = window.setTimeout(() => setLeft((n) => n - 1), 1000);
    return () => window.clearTimeout(t);
  }, [left, cancelled, router]);

  return (
    <div className="mt-10" data-testid="not-found-redirect">
      <p role="status" aria-live="polite" className="sr-only">
        {cancelled ? "Redirect cancelled. You can stay on this page." : `This page does not exist. Taking you to the home page in ${SECONDS} seconds.`}
      </p>
      {cancelled ? (
        <p className="text-cream/80">Redirect cancelled. Choose where to go next.</p>
      ) : (
        <div className="flex items-center gap-4">
          <span className="relative inline-flex size-14 items-center justify-center" aria-hidden="true">
            <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90">
              <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
              <circle cx="24" cy="24" r="21" fill="none" stroke="var(--bronze)" strokeWidth="3" strokeLinecap="round" strokeDasharray="132" className="not-found-ring" style={{ animationDuration: `${SECONDS}s` }} />
            </svg>
            <span className="font-display text-xl font-semibold text-white" data-testid="not-found-seconds">
              {left}
            </span>
          </span>
          <p className="text-cream/85">
            Taking you to the home page in {left} {left === 1 ? "second" : "seconds"}.
          </p>
        </div>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-water px-6 font-display text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-water-deep">
          <Home className="size-4" aria-hidden="true" />
          Go to home now
        </Link>
        {!cancelled ? (
          <button type="button" onClick={() => setCancelled(true)} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-cream/40 px-6 font-display text-sm font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:border-bronze hover:text-bronze" data-testid="not-found-stay">
            <PauseCircle className="size-4" aria-hidden="true" />
            Stay on this page
          </button>
        ) : null}
      </div>
      <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
        {[
          { href: "/products", label: "Products" },
          { href: "/gallery", label: "Gallery" },
          { href: "/downloads", label: "Downloads" },
          { href: "/contact", label: "Contact" },
        ].map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group inline-flex items-center gap-1 text-cream/80 underline-offset-4 hover:text-white hover:underline">
              {l.label}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
