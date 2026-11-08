"use client";

import { Fragment } from "react";
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

/**
 * Image reveal: the frame opens from a clipped inset while the image settles from a slight zoom.
 * Under reduced motion MotionConfig drops the transform and the image simply appears.
 */
export function MaskReveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(14% 10% 14% 10% round 6px)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 6px)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      <motion.div className="h-full w-full" initial={{ scale: 1.14 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 1.4, delay, ease: EASE }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

const wordsContainer: Variants = { hidden: {}, show: (delay: number = 0) => ({ transition: { staggerChildren: 0.06, delayChildren: delay } }) };
const wordItem: Variants = {
  hidden: { y: "105%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.75, ease: EASE } },
};

/**
 * Splits a heading into words that rise into place one after another. The words stay plain text
 * separated by real spaces, so screen readers and search engines read the heading normally.
 * `trigger="load"` runs on page load (heroes); the default runs when scrolled into view.
 */
export function WordsReveal({ text, className, trigger = "view", delay = 0 }: { text: string; className?: string; trigger?: "view" | "load"; delay?: number }) {
  const words = text.split(" ");
  const play = trigger === "load" ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -8% 0px" } };
  return (
    <motion.span className={className} variants={wordsContainer} custom={delay} initial="hidden" {...play}>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span className="inline-block" variants={wordItem}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}
