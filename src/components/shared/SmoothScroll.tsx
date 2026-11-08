"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/** Height of the sticky header, so in-page anchors land below it. */
const HEADER_OFFSET = -88;

/**
 * Inertial smooth scrolling (Lenis) for wheel and trackpad. Touch scrolling stays native.
 * Off for visitors who prefer reduced motion. Pauses while a dialog or menu locks the page
 * (Radix sets `data-scroll-locked` on <body>), so the page behind a modal never moves.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.11, smoothWheel: true, anchors: { offset: HEADER_OFFSET } });
    lenisRef.current = lenis;

    const sync = () => (document.body.hasAttribute("data-scroll-locked") ? lenis.stop() : lenis.start());
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });

    return () => {
      observer.disconnect();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // A new page starts at the top; Lenis must not carry on animating towards the old position.
  useEffect(() => {
    if (!window.location.hash) lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
