"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin reading-progress bar along the top edge of the viewport. Decorative, so hidden from assistive tech. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden="true" style={{ scaleX }} className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-water via-[#2f7fa6] to-bronze" />;
}
