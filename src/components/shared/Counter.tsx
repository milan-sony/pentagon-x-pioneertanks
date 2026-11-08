"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export interface CounterProps {
  /** Final value. */
  value: number;
  /** Text before/after the number (e.g. "+", " m³"). */
  prefix?: string;
  suffix?: string;
  /** Decimal places. */
  decimals?: number;
  /** Duration in seconds. */
  duration?: number;
  className?: string;
}

/**
 * Counts up from 0 to `value` once the element scrolls into view.
 * Renders the final value immediately for reduced-motion users and before hydration.
 */
export function Counter({ value, prefix = "", suffix = "", decimals = 0, duration = 1.6, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = usePrefersReducedMotion();
  const [display, setDisplay] = useState<number | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current || reduce) return;
    started.current = true;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
      onComplete: () => setDisplay(value),
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  const shown = display ?? value;
  const formatted = shown.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">
        {prefix}
        {value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
        {suffix}
      </span>
      <span aria-hidden="true">
        {prefix}
        {formatted}
        {suffix}
      </span>
    </span>
  );
}
