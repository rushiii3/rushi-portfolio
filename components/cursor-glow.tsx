"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[-1]"
      animate={{
        background: `radial-gradient(1600px circle at ${position.x}px ${position.y}px, rgba(32,194,14, 0.15), transparent 40%)`,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  );
}
