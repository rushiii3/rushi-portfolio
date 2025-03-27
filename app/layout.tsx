import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CursorGlow from "@/components/cursor-glow";
import Header from "@/components/Header";
import FooterSection from "@/components/footer";
import { LenisProvider, ThemeProvider } from "@/Provider";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scrollbar`}
      >
        <NextTopLoader
          color="rgba(32,194,14,0.8)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          zIndex={1600}
          showAtBottom={false}
        />
        <LenisProvider>
          <Header />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 min-h-dvh">
              {children}
            </main>
          </ThemeProvider>

          <FooterSection />
          <CursorGlow />
        </LenisProvider>
      </body>
    </html>
  );
}
