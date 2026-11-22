// components/motion.tsx
"use client";
import { LazyMotion, domAnimation, m } from "motion/react";
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

const RevealDiv = memo(function RevealDiv(p: React.ComponentProps<typeof m.div>) {
  return <LazyMotion features={domAnimation} strict><m.div {...defaultProps} {...p} /></LazyMotion>;
});
const RevealSection = memo(function RevealSection(p: React.ComponentProps<typeof m.section>) {
  return <LazyMotion features={domAnimation} strict><m.section {...defaultProps} {...p} /></LazyMotion>;
});
const RevealH2 = memo(function RevealH2(p: React.ComponentProps<typeof m.h2>) {
  return <LazyMotion features={domAnimation} strict><m.h2 {...defaultProps} {...p} /></LazyMotion>;
});
const RevealP = memo(function RevealP(p: React.ComponentProps<typeof m.p>) {
  return <LazyMotion features={domAnimation} strict><m.p {...defaultProps} {...p} /></LazyMotion>;
});

export const Reveal = {
  Div: RevealDiv,
  Section: RevealSection,
  H2: RevealH2,
  P: RevealP,
};
