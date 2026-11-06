"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MarqueeProps {
  items: React.ReactNode[];
  /** Seconds for one full loop. */
  duration?: number;
  className?: string;
  itemClassName?: string;
  /** Visually hidden label for the region. */
  label: string;
}

/**
 * Continuous horizontal strip (CSS animation, duplicated content). Pauses on
 * hover, has a visible pause control (WCAG 2.2.2) and rests entirely under
 * `prefers-reduced-motion` via the global rule.
 */
export function Marquee({ items, duration = 40, className, itemClassName, label }: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const row = [...items, ...items];
  return (
    <div className={cn("group relative overflow-hidden", className)} role="region" aria-label={label}>
      <ul
        className="flex w-max gap-10 whitespace-nowrap motion-safe:[animation:marquee_var(--marquee-duration)_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${duration}s`, animationPlayState: paused ? "paused" : undefined } as React.CSSProperties}
        aria-hidden="true"
      >
        {row.map((item, i) => (
          <li key={i} className={itemClassName}>
            {item}
          </li>
        ))}
      </ul>
      <ul className="sr-only">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play scrolling strip" : "Pause scrolling strip"}
        className="absolute right-2 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-none bg-background/80 text-foreground opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
      >
        {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
      </button>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
