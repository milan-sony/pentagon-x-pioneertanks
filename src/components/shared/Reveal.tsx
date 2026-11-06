"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Delay in seconds. */
  delay?: number;
  /** Vertical offset in px. Keep small – subtle, professional motion only. */
  y?: number;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Subtle fade/slide-in when an element enters the viewport. Runs once.
 * MotionProvider disables it for users who prefer reduced motion.
 */
export function Reveal({ children, delay = 0, y = 16, as = "div", ...rest }: RevealProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
}
