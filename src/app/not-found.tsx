import type { Metadata } from "next";
import { NotFoundRedirect } from "@/components/shared/NotFoundRedirect";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

/** 404: a "404" that is half full of moving water, a short message, and a cancellable redirect home. */
export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-espresso text-cream" aria-labelledby="not-found-title">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_20%,rgb(31_78_106/0.55),transparent_60%)]" aria-hidden="true" />
      <div className="mx-auto grid min-h-[calc(100svh-76px)] max-w-[1400px] items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 xl:px-10">
        <div className="lg:col-span-6 lg:order-2">
          <svg viewBox="0 0 600 260" className="w-full max-w-xl" role="img" aria-label="404">
            <defs>
              <clipPath id="nf-text">
                <text x="50%" y="215" textAnchor="middle" className="font-display" fontSize="250" fontWeight="700" letterSpacing="-6">
                  404
                </text>
              </clipPath>
            </defs>
            <text x="50%" y="215" textAnchor="middle" className="font-display" fontSize="250" fontWeight="700" letterSpacing="-6" fill="none" stroke="rgb(242 237 228 / 0.35)" strokeWidth="2">
              404
            </text>
            <g clipPath="url(#nf-text)">
              <g className="nf-water">
                <path className="nf-wave" d="M0 120 Q50 95 100 120 T200 120 T300 120 T400 120 T500 120 T600 120 T700 120 T800 120 T900 120 T1000 120 T1100 120 T1200 120 V300 H0 Z" fill="var(--water)" />
                <path className="nf-wave nf-wave--back" d="M0 128 Q50 108 100 128 T200 128 T300 128 T400 128 T500 128 T600 128 T700 128 T800 128 T900 128 T1000 128 T1100 128 T1200 128 V300 H0 Z" fill="#4f9ec3" opacity="0.55" />
              </g>
            </g>
          </svg>
        </div>
        <div className="lg:col-span-6 lg:order-1">
          <p className="eyebrow text-bronze">Error 404</p>
          <h1 id="not-found-title" className="mt-4 font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-semibold uppercase leading-[1.02] tracking-[0.01em] text-white">
            This page has run dry
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-cream/80">The page you are looking for has moved or no longer exists.</p>
          <NotFoundRedirect />
        </div>
      </div>
    </section>
  );
}
