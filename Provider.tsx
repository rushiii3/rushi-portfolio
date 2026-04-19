"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import dynamic from "next/dynamic";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export const CursorGlow = dynamic(() => import("@/components/cursor-glow"), {
  ssr: false,
});
export const TopLoader = dynamic(() => import("@/components/TopLoader"), {
  ssr: false,
});

export const CookieConsent = dynamic(() => import("@/components/CookieConsent"), {
  ssr: false,
  loading: () => null,
});
// export const Lenis = dynamic(() => import("@/components/Lenis"), { ssr: false });
