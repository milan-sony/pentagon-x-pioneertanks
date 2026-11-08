"use client";

import { motion } from "framer-motion";

/** Slow settle from a slight zoom on page load (hero photograph). Dropped under reduced motion by MotionConfig. */
export function HeroZoom({ children }: { children: React.ReactNode }) {
  return (
    <motion.div className="h-full w-full" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
