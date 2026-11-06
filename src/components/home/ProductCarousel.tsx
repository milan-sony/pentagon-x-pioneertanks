"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ImageAsset } from "@/types/content";
import { cn } from "@/lib/utils";

export interface CarouselCard {
  href: string;
  title: string;
  subtitle: string;
  image: ImageAsset;
}

/** Horizontal strip of image-overlay cards with previous/next buttons. Scroll-snap, no auto-play. */
export function ProductCarousel({ cards, label }: { cards: CarouselCard[]; label: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("li");
    const w = card ? card.getBoundingClientRect().width + 20 : 360;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };
  return (
    <div className="relative">
      <div className="mb-6 flex justify-end gap-2">
        <button type="button" onClick={() => scrollBy(-1)} className="inline-flex size-11 items-center justify-center rounded-full border border-ink/30 text-ink transition-colors hover:border-water hover:text-water" aria-label="Scroll products left">
          <ArrowLeft className="size-5" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => scrollBy(1)} className="inline-flex size-11 items-center justify-center rounded-full border border-ink/30 text-ink transition-colors hover:border-water hover:text-water" aria-label="Scroll products right">
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>
      </div>
      <ul ref={ref} className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 xl:-mx-10 xl:px-10" aria-label={label}>
        {cards.map((c) => (
          <li key={c.href} className="w-[80vw] shrink-0 snap-start sm:w-[46vw] lg:w-[31%]">
            <Link href={c.href} className="group relative block overflow-hidden rounded-md bg-espresso text-cream shadow-card transition-transform duration-300 hover:-translate-y-1">
              <Image src={c.image.cardSrc ?? c.image.src ?? c.image.sourcePath} alt={c.image.alt} width={c.image.width} height={c.image.height} sizes="(min-width: 1024px) 30vw, 80vw" className={cn("aspect-[4/5] w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.05]")} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso via-espresso/80 to-transparent p-6 pt-16">
                <h3 className="font-display text-2xl font-bold uppercase leading-tight tracking-wide text-white">{c.title}</h3>
                <p className="mt-2 text-sm text-cream/80">{c.subtitle}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
