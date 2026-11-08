"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Hydration-safe reduced-motion preference. The server snapshot (and the hydration render) is
 * always `false`, then React re-renders with the visitor's real preference – so server and client
 * HTML match. framer-motion's `useReducedMotion` reads the media query during the first client
 * render, which caused hydration mismatches for visitors who prefer reduced motion.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
