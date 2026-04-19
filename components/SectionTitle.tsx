"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const };
const variants = {
  hidden: {
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    filter: "blur(10px)",
    opacity: 0,
  },
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    filter: "blur(0)",
    opacity: 1,
    transition,
  },
};

const SectionTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  // Use a state to track if we should animate.
  // On mount, we check if this specific instance has already "appeared".
  const [hasAppeared, setHasAppeared] = useState(false);

  return (
    <motion.h2
      className={className}
      initial={hasAppeared ? "visible" : "hidden"}
      whileInView="visible"
      onViewportEnter={() => setHasAppeared(true)}
      viewport={{ once: true }}
      variants={variants}
    >
      {title}
    </motion.h2>
  );
};

export default SectionTitle;
