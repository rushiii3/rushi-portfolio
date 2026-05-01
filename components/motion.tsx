// components/motion.tsx
"use client";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { memo } from "react";

const TRANSITION = { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const };
export const REVEAL_VARIANTS = {
  hidden: {
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    filter: "blur(10px)",
    opacity: 0,
  },
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    filter: "blur(0px)",
    opacity: 1,
    transition: TRANSITION,
  },
};

const defaultProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-60px" },
  variants: REVEAL_VARIANTS,
} as const;

// ✅ Each is created once, typed correctly, zero runtime cost
export const Reveal = {
  Div:     memo((p: React.ComponentProps<typeof m.div>)     => <LazyMotion features={domAnimation} strict><m.div     {...defaultProps} {...p} /></LazyMotion>),
  Section: memo((p: React.ComponentProps<typeof m.section>) => <LazyMotion features={domAnimation} strict><m.section {...defaultProps} {...p} /></LazyMotion>),
  H2:      memo((p: React.ComponentProps<typeof m.h2>)      => <LazyMotion features={domAnimation} strict><m.h2      {...defaultProps} {...p} /></LazyMotion>),
  P:       memo((p: React.ComponentProps<typeof m.p>)       => <LazyMotion features={domAnimation} strict><m.p       {...defaultProps} {...p} /></LazyMotion>),
};