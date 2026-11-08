"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Sticky header wrapper: gains a shadow once the page scrolls, slides away while scrolling down
 * past the first screen and returns on any upward scroll. It stays put while focus is inside it
 * (keyboard users in the menu) and for visitors who prefer reduced motion.
 */
export function HeaderShell({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let last = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 8);
        const focusInside = ref.current?.contains(document.activeElement) ?? false;
        if (reduce || focusInside || y < 400) setHidden(false);
        else if (y > last + 6) setHidden(true);
        else if (y < last - 6) setHidden(false);
        last = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      ref={ref}
      onFocus={() => setHidden(false)}
      data-scrolled={scrolled}
      className={cn(
        "sticky top-0 z-40 border-b transition-[translate,scale,box-shadow,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled ? "border-border/60 bg-cream/92 shadow-[0_10px_30px_-18px_rgb(43_33_27/0.35)] backdrop-blur-md" : "border-transparent bg-cream/80 backdrop-blur-sm",
        hidden && "-translate-y-full",
        className,
      )}
    >
      {children}
    </header>
  );
}
