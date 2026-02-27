"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isCoarsePointer) {
      return;
    }

    let rafId: number | null = null;
    let latestX = 0;
    let latestY = 0;
    let hasPointer = false;

    const paint = () => {
      if (!glowRef.current || !hasPointer) {
        rafId = null;
        return;
      }

      glowRef.current.style.background = `radial-gradient(1000px circle at ${latestX}px ${latestY}px, rgba(32,194,14,0.12), transparent 45%)`;
      rafId = null;
    };

    const updatePosition = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      hasPointer = true;
      if (rafId === null) {
        rafId = window.requestAnimationFrame(paint);
      }
    };

    window.addEventListener("mousemove", updatePosition, { passive: true });

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-[-1] will-change-[background]"
    />
  );
}
