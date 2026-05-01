"use client";
import { LazyMotion, domAnimation, m } from "framer-motion";

// ✅ Moved outside — these are static, no reason to recreate per render
const TRANSITION = { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const };
const VARIANTS = {
  hidden: {
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    filter: "blur(10px)",
    opacity: 0,
  },
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    filter: "blur(0px)", // ✅ "blur(0)" → "blur(0px)": some browsers don't interpolate unitless blur correctly
    opacity: 1,
    transition: TRANSITION,
  },
};

const SectionTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.h2
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }} // ✅ triggers slightly before fully in view
        variants={VARIANTS}
      >
        {title}
      </m.h2>
    </LazyMotion>
  );
};

export default SectionTitle;