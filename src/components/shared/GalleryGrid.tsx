"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types/content";

export interface GalleryGroupData {
  id: string;
  name: string;
  assets: ImageAsset[];
}

export interface GalleryGridProps {
  groups: GalleryGroupData[];
  classNames?: {
    filterBar?: string;
    filterButton?: string;
    filterButtonActive?: string;
    grid?: string;
    tile?: string;
    caption?: string;
    dialog?: string;
    navButton?: string;
  };
}

/**
 * Filterable gallery with an accessible lightbox (Radix Dialog: focus trap,
 * Esc, aria). Keyboard arrows move between images while the lightbox is open.
 */
const full = (a: ImageAsset) => a.src ?? a.sourcePath;
const card = (a: ImageAsset) => a.cardSrc ?? a.src ?? a.sourcePath;

export function GalleryGrid({ groups, classNames = {} }: GalleryGridProps) {
  const [filter, setFilter] = useState<string>("all");
  const visible = groups.filter((g) => filter === "all" || g.id === filter).flatMap((g) => g.assets.map((a) => ({ ...a, group: g.name })));
  const [index, setIndex] = useState<number | null>(null);
  const current = index === null ? null : visible[index];

  const step = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i === null ? null : (i + dir + visible.length) % visible.length));
    },
    [visible.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  return (
    <div>
      <div className={cn("flex flex-wrap gap-2", classNames.filterBar)} role="group" aria-label="Filter gallery">
        {[{ id: "all", name: "All" }, ...groups].map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => {
              setFilter(g.id);
              setIndex(null);
            }}
            aria-pressed={filter === g.id}
            className={cn("min-h-10 px-4 text-sm font-medium transition-colors", classNames.filterButton, filter === g.id && classNames.filterButtonActive)}
          >
            {g.name}
            <span className="sr-only"> ({g.id === "all" ? groups.reduce((n, x) => n + x.assets.length, 0) : groups.find((x) => x.id === g.id)?.assets.length} images)</span>
          </button>
        ))}
      </div>
      <ul className={cn("mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", classNames.grid)}>
        {visible.map((a, i) => (
          <li key={a.id}>
            <button type="button" onClick={() => setIndex(i)} className={cn("group block w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring", classNames.tile)}>
              <Image src={card(a)} alt={a.alt} width={a.width} height={a.height} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              <span className={cn("block pt-3 text-sm", classNames.caption)}>
                {a.group}
                <span className="sr-only"> – open image</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={index !== null} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogContent showCloseButton={false} className={cn("max-w-[min(96vw,1200px)] border-0 bg-black p-0 text-white sm:max-w-[min(96vw,1200px)]", classNames.dialog)}>
          {current ? (
            <figure className="relative">
              <DialogTitle className="sr-only">{current.alt}</DialogTitle>
              <Image src={full(current)} alt={current.alt} width={current.width} height={current.height} sizes="96vw" className="max-h-[80vh] w-full object-contain" />
              <figcaption className="flex items-center justify-between gap-4 px-4 py-3 text-sm text-white/80">
                <span>
                  {current.group} · {index! + 1} / {visible.length}
                </span>
                <span className="flex gap-2">
                  <button type="button" onClick={() => step(-1)} className={cn("inline-flex size-11 items-center justify-center bg-white/10 hover:bg-white/20", classNames.navButton)} aria-label="Previous image">
                    <ChevronLeft className="size-5" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => step(1)} className={cn("inline-flex size-11 items-center justify-center bg-white/10 hover:bg-white/20", classNames.navButton)} aria-label="Next image">
                    <ChevronRight className="size-5" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => setIndex(null)} className={cn("inline-flex size-11 items-center justify-center bg-white/10 hover:bg-white/20", classNames.navButton)} aria-label="Close">
                    <X className="size-5" aria-hidden="true" />
                  </button>
                </span>
              </figcaption>
            </figure>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
