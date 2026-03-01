"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { cancelFrame, frame } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
export function LenisProvider({
  children,
  ...props
}: React.ComponentProps<typeof ReactLenis>) {
  const lenisRef = useRef<LenisRef>(null);
  const [enableLenis, setEnableLenis] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    setEnableLenis(!prefersReducedMotion && !isCoarsePointer);
  }, []);

  useEffect(() => {
    if (!enableLenis) {
      return;
    }

    function update(data: { timestamp: number }) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, [enableLenis]);

  if (!enableLenis) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      {...props}
      root
      options={{ autoRaf: false, smoothWheel: true, touchMultiplier: 1 }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
}
