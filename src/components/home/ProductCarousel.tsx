"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "framer-motion";
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
/** After the visitor scrolls the strip or uses the arrows, wait this long before auto-scrolling again. */
const RESUME_AFTER_MS = 6000;

/** Scroll the strip by one card; with `loop`, wrap around at either end. */
function advance(el: HTMLUListElement | null, dir: 1 | -1, loop: boolean, smooth: boolean) {
  if (!el) return;
  const card = el.querySelector("li");
  const w = card ? card.getBoundingClientRect().width + 20 : 360;
  const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
  const atStart = el.scrollLeft <= 8;
  const behavior: ScrollBehavior = smooth ? "smooth" : "auto";
  if (loop && dir === 1 && atEnd) el.scrollTo({ left: 0, behavior });
  else if (loop && dir === -1 && atStart) el.scrollTo({ left: el.scrollWidth, behavior });
  else el.scrollBy({ left: dir * w, behavior });
}

/**
 * Auto-scrolling strip of image-overlay cards.
 * - Advances one card every 3.5 s and loops back to the start.
 * - Pauses while the pointer is over it, while it has keyboard focus, while off screen, and for 6 s
 *   after the visitor swipes, wheels or uses the arrows (only real input counts – the strip's own
 *   smooth scrolling never pauses it).
 * - Visible pause/play button (WCAG 2.2.2). Runs for every visitor, including those who prefer
 *   reduced motion (client decision, 2026-11-08); the pause button and hover/focus pauses still apply.
 */
export function ProductCarousel({ cards, label }: { cards: CarouselCard[]; label: string }) {
  const listRef = useRef<HTMLUListElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "-20% 0px -20% 0px" });
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [hovering, setHovering] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [progress, setProgress] = useState(0);
  const resumeAt = useRef(0);

  const paused = userPaused ?? false;
  const running = !paused && !hovering && !keyboardFocus && inView;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      if (Date.now() < resumeAt.current) return;
      advance(listRef.current, 1, true, true);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [running]);

  const onScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  /** Real visitor input on the strip: hold auto-scroll back for a while. */
  const holdOff = () => {
    resumeAt.current = Date.now() + RESUME_AFTER_MS;
  };

  const manual = (dir: 1 | -1) => {
    holdOff();
    advance(listRef.current, dir, true, true);
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={(e) => setKeyboardFocus((e.target as HTMLElement).matches(":focus-visible"))}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node | null) && setKeyboardFocus(false)}
    >
      <ul
        ref={listRef}
        onScroll={onScroll}
        onPointerDown={holdOff}
        onTouchStart={holdOff}
        onWheel={(e) => Math.abs(e.deltaX) > Math.abs(e.deltaY) && holdOff()}
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
