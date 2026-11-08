"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const SEEN_KEY = "pwt-preloaded";
const MIN_MS = 1100;
const MAX_MS = 2600;

/**
 * Runs before first paint (inlined in <head>): returning visitors in this session and visitors who
 * prefer reduced motion never see the preloader.
 */
export const PRELOADER_BOOT_SCRIPT = `try{if(sessionStorage.getItem("${SEEN_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("preloader-off")}catch(e){}`;

/**
 * Brand preloader: the logo above a steel tank that fills with water, shown once per browser session.
 * It is purely visual (aria-hidden); the page underneath is fully rendered and readable throughout.
 * State changes are written to the DOM directly so React never re-renders the page for it.
 */
export function Preloader({ logo }: { logo: { src: string; width: number; height: number } }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || document.documentElement.classList.contains("preloader-off")) return;
    const started = performance.now();
    let leaveTimer = 0;
    let goneTimer = 0;
    const leave = () => {
      window.clearTimeout(leaveTimer);
      const wait = Math.max(0, MIN_MS - (performance.now() - started));
      leaveTimer = window.setTimeout(() => {
        el.dataset.state = "leaving";
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {}
        goneTimer = window.setTimeout(() => (el.dataset.state = "gone"), 700);
      }, wait);
    };
    if (document.readyState === "complete") leave();
    else window.addEventListener("load", leave, { once: true });
    const fallback = window.setTimeout(leave, MAX_MS);
    return () => {
      window.removeEventListener("load", leave);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(goneTimer);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div ref={ref} id="preloader" aria-hidden="true" data-testid="preloader">
      <div className="preloader-inner flex flex-col items-center gap-7">
        <Image src={logo.src} alt="" width={logo.width} height={logo.height} priority className="h-12 w-auto sm:h-14" />
        <svg viewBox="0 0 120 84" className="h-[84px] w-[120px]" focusable="false">
          <defs>
            <clipPath id="preloader-tank">
              <rect x="14" y="10" width="92" height="66" rx="6" />
            </clipPath>
          </defs>
          {/* Water: a wave that rises to fill the tank */}
          <g clipPath="url(#preloader-tank)">
            <g className="preloader-water">
              <path className="preloader-wave" d="M0 14 Q15 6 30 14 T60 14 T90 14 T120 14 T150 14 T180 14 T210 14 T240 14 V90 H0 Z" fill="var(--water)" opacity="0.9" />
              <path className="preloader-wave preloader-wave--back" d="M0 16 Q15 10 30 16 T60 16 T90 16 T120 16 T150 16 T180 16 T210 16 T240 16 V90 H0 Z" fill="#4f9ec3" opacity="0.45" />
            </g>
          </g>
          {/* Tank shell: corrugated rings and a shallow dome roof */}
          <path d="M14 14 Q60 -2 106 14" fill="none" stroke="var(--espresso)" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="14" y="10" width="92" height="66" rx="6" fill="none" stroke="var(--espresso)" strokeWidth="2.5" />
          {[27, 40, 53, 66].map((y) => (
            <line key={y} x1="14" x2="106" y1={y} y2={y} stroke="var(--espresso)" strokeOpacity="0.18" strokeWidth="1.5" />
          ))}
        </svg>
        <span className="preloader-bar" />
      </div>
    </div>
  );
}
