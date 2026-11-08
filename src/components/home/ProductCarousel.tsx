"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import type { ImageAsset } from "@/types/content";

export interface CarouselCard {
  href: string;
  title: string;
  subtitle: string;
  kicker: string;
  image: ImageAsset;
}

const INTERVAL_MS = 3500;
/** After a manual swipe/click, wait this long before auto-scrolling again. */
const RESUME_AFTER_MS = 8000;

/** Scroll the strip by one card; with `loop`, wrap around at either end. */
function advance(el: HTMLUListElement | null, programmatic: React.RefObject<boolean>, dir: 1 | -1, loop: boolean) {
  if (!el) return;
  const card = el.querySelector("li");
  const w = card ? card.getBoundingClientRect().width + 20 : 360;
  const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
  const atStart = el.scrollLeft <= 8;
  programmatic.current = true;
  if (loop && dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
  else if (loop && dir === -1 && atStart) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
  else el.scrollBy({ left: dir * w, behavior: "smooth" });
  window.setTimeout(() => (programmatic.current = false), 700);
}

/**
 * Auto-scrolling strip of image-overlay cards.
 * - Advances one card every 3.5 s and loops back to the start.
 * - Pauses while hovered or focused, while off screen, and for a while after any manual scroll.
 * - Visible pause/play button (WCAG 2.2.2); starts paused for visitors who prefer reduced motion.
 */
export function ProductCarousel({ cards, label }: { cards: CarouselCard[]; label: string }) {
  const listRef = useRef<HTMLUListElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "-20% 0px -20% 0px" });
  const reduce = useReducedMotion();
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [hovering, setHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const resumeAt = useRef(0);
  const programmatic = useRef(false);

  const paused = userPaused ?? !!reduce;
  const running = !paused && !hovering && inView;

  const step = (dir: 1 | -1, loop = false) => advance(listRef.current, programmatic, dir, loop);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      if (Date.now() < resumeAt.current) return;
      advance(listRef.current, programmatic, 1, true);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [running]);

  const onScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    if (!programmatic.current) resumeAt.current = Date.now() + RESUME_AFTER_MS;
  };

  const manual = (dir: 1 | -1) => {
    resumeAt.current = Date.now() + RESUME_AFTER_MS;
    step(dir, true);
  };

  return (
    <div ref={wrapRef} className="relative" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} onFocus={() => setHovering(true)} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node | null) && setHovering(false)}>
      <ul
        ref={listRef}
        onScroll={onScroll}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 xl:-mx-10 xl:px-10 [&::-webkit-scrollbar]:hidden"
        aria-label={label}
        data-testid="product-carousel"
      >
        {cards.map((c) => (
          <li key={c.href} className="w-[82vw] shrink-0 snap-start sm:w-[46vw] lg:w-[calc((100%-40px)/3.2)]">
            <Link href={c.href} className="group relative block overflow-hidden rounded-md bg-espresso text-cream shadow-card">
              <Image src={c.image.cardSrc ?? c.image.src ?? c.image.sourcePath} alt={c.image.alt} width={c.image.width} height={c.image.height} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 82vw" className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]" />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/35 to-transparent transition-opacity duration-500 group-hover:opacity-90" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="eyebrow text-bronze">{c.kicker}</p>
                <h3 className="heading-3 mt-2 text-white">{c.title}</h3>
                <p className="mt-2 text-sm text-cream/80">{c.subtitle}</p>
                <span className="mt-4 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  View details
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-4">
        <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-border" aria-hidden="true">
          <div className="h-full origin-left bg-water transition-transform duration-500 ease-out" style={{ transform: `scaleX(${Math.max(0.12, progress)})` }} />
        </div>
        <button type="button" onClick={() => setUserPaused(!paused)} className="inline-flex size-11 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors hover:border-water hover:text-water" aria-label={paused ? "Start automatic scrolling" : "Pause automatic scrolling"} data-testid="carousel-toggle">
          {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
        </button>
        <button type="button" onClick={() => manual(-1)} className="inline-flex size-11 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors hover:border-water hover:bg-water hover:text-white" aria-label="Previous products">
          <ArrowLeft className="size-5" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => manual(1)} className="inline-flex size-11 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors hover:border-water hover:bg-water hover:text-white" aria-label="Next products">
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
