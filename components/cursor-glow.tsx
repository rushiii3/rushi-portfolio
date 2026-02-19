"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(1600px circle at ${e.clientX}px ${e.clientY}px, rgba(32,194,14, 0.15), transparent 40%)`;
      }
    };

    window.addEventListener("mousemove", updatePosition, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  return (
    <div ref={glowRef} className="pointer-events-none fixed inset-0 z-[-1]" />
  );
}
