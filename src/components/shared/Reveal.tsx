"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  /** Delay in seconds. */
  delay?: number;
  /** Vertical offset in px. */
  y?: number;
  /** Horizontal offset in px (for slide-ins from a side). */
  x?: number;
  as?: "div" | "section" | "li" | "article" | "figure" | "header" | "p" | "span";
  duration?: number;
};

/**
 * Fade/slide-in when an element enters the viewport. Runs once.
 * MotionProvider (reducedMotion="user") disables it for users who prefer reduced motion.
 */
export function Reveal({ children, delay = 0, y = 20, x = 0, as = "div", duration = 0.6, ...rest }: RevealProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Component>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/** Parent that staggers its `StaggerItem` children when scrolled into view. */
export function Stagger({ children, as = "div", className, ...rest }: HTMLMotionProps<"div"> & { as?: "div" | "ul" | "ol" | "section" }) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -10% 0px" }} className={className} {...rest}>
      {children}
    </Component>
  );
}

export function StaggerItem({ children, as = "div", ...rest }: HTMLMotionProps<"div"> & { as?: "div" | "li" | "article" | "figure" }) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component variants={itemVariants} {...rest}>
      {children}
    </Component>
  );
}

/** Page-load entrance for hero elements (no viewport trigger). */
export function Entrance({ children, delay = 0, y = 24, as = "div", duration = 0.8, ...rest }: RevealProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component initial={{ opacity: 0, y }} animate={{ opacity: 1, y: 0 }} transition={{ duration, delay, ease: EASE }} {...rest}>
      {children}
    </Component>
  );
}
