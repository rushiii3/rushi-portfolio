"use client";

import { motion, MotionProps } from "framer-motion";
import React, { JSX } from "react";
const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] };

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
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};

interface CustomMotionProps<Tag extends keyof JSX.IntrinsicElements>
  extends MotionProps {
  type?: Tag; // HTML tag (e.g., "div", "button")
  children: React.ReactNode; // Component content
  className?: string; // Optional class for styling
}

export const Motion = <Tag extends keyof JSX.IntrinsicElements = "div">({
  type = "div" as Tag, // Default to 'div' if no type is provided
  children,
  className,
  ...props
}: CustomMotionProps<Tag>) => {
  const Component = motion.create(type) as React.ElementType; // Dynamically set motion component

  return (
    <Component
      className={className}
      initial={variants.hidden} // Default animation: fade-in + slight scale effect
      animate={variants.visible}
      exit={variants.hidden}
      transition={transition}
      whileInView={variants.visible}
      viewport={{ once: true }}
      {...props}
    >
      {children}
    </Component>
  );
};
