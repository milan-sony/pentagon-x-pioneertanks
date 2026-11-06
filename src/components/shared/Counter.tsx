"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

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
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView || started) return;
    setStarted(true);
    if (reduce) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, started, reduce, value, duration]);

  const formatted = (started && !reduce ? display : value).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value.toLocaleString("en-US")}${suffix}`}>
      <span aria-hidden="true">
        {prefix}
        {formatted}
        {suffix}
      </span>
    </span>
  );
}
