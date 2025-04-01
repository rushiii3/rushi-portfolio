"use client";

import { motion, MotionProps } from "framer-motion";
import React, { JSX, memo } from "react";
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
    transition,
  },
};

interface CustomMotionProps<Tag extends keyof JSX.IntrinsicElements>
  extends MotionProps {
  type?: Tag; // HTML tag (e.g., "div", "button")
  children: React.ReactNode; // Component content
  className?: string; // Optional class for styling
}

const MotionComponent = <Tag extends keyof JSX.IntrinsicElements = "div">({
  type = "div" as Tag, // Default to 'div' if no type is provided
  children,
  className,
  ...props
}: CustomMotionProps<Tag>) => {
  const Component = motion.create(type) as React.ElementType; // Dynamically set motion component

  return (
    <Component
    className={className}
    initial="hidden"
    whileInView="visible" // Triggers animation when in view
    viewport={{ once: true }} // Ensures animation runs once when 20% is in view
    variants={variants}
    {...props}
    >
      {children}
    </Component>
  );
};


export const Motion = memo(MotionComponent);
