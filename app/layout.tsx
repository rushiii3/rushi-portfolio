import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Space_Grotesk,
  Merriweather,
  Fira_Code,
} from "next/font/google";
import "./globals.css";
import CursorGlow from "@/components/cursor-glow";
import Header from "@/components/Header";
import FooterSection from "@/components/footer";
import { LenisProvider, ThemeProvider } from "@/Provider";
import NextTopLoader from "nextjs-toploader";

const preconnectDomains = [
  "https://images.unsplash.com",
  "https://res.cloudinary.com",
];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fontSans = Space_Grotesk({
  variable: "--font-grotesk-sans",
  subsets: ["latin"],
});
const fontSerif = Merriweather({
  variable: "--font-merriweather-serif",
  subsets: ["latin"],
});
const fontMono = Fira_Code({
  variable: "--font-fira-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),

  title: "Hrushikesh Shinde | Cybersecurity Specialist from India 🇮🇳",
  description:
    "Hi, I'm Hrushikesh Shinde — a Cybersecurity Specialist from Mumbai, India 🇮🇳. I specialize in Vulnerability Assessment and Penetration Testing (VAPT), web/mobile application security, and digital forensics. Passionate about securing digital assets and enhancing cyber resilience with a security-first approach.",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  applicationName: "Hrushikesh Shinde",
  appleWebApp: {
    title: "Hrushikesh Shinde",
    statusBarStyle: "default",
    capable: true,
  },
  openGraph: {
    title: "Hrushikesh Shinde | Cybersecurity Specialist from India 🇮🇳",
    description:
      "Hi, I'm Hrushikesh Shinde — a Cybersecurity Specialist from Mumbai, India 🇮🇳. I specialize in Vulnerability Assessment and Penetration Testing (VAPT), web/mobile application security, and digital forensics. Passionate about securing digital assets and enhancing cyber resilience with a security-first approach.",
    images: [
      {
        url: "/og.webp", // Next.js automatically prepends your domain
        width: 1200,
        height: 630,
        alt: "Site preview",
      },
    ],
    type: "website",
    siteName: "Hrushikesh Shinde",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hrushikesh Shinde | Cybersecurity Specialist from India 🇮🇳",
    description:
      "Hi, I'm Hrushikesh Shinde — a Cybersecurity Specialist from Mumbai, India 🇮🇳. I specialize in Vulnerability Assessment and Penetration Testing (VAPT), web/mobile application security, and digital forensics. Passionate about securing digital assets and enhancing cyber resilience with a security-first approach.",
    images: ["/og.webp"],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_URL,
    languages: {
      "en-IN": "/",
    },
  },
  publisher: "https://www.linkedin.com/in/hrushikesh-shinde/",
  verification: {
    google: `${process.env.NEXT_GOOGLE_CONSOLE}`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {preconnectDomains.map((domain) => (
          <link key={domain} rel="preconnect" href={domain} />
        ))}
        {preconnectDomains.map((domain) => (
          <link key={`dns-${domain}`} rel="dns-prefetch" href={domain} />
        ))}
        <meta name="apple-mobile-web-app-title" content="Hrushikesh Shinde" />
        <link
          rel="manifest"
          href="/manifest.webmanifest"
          crossOrigin="use-credentials"
        />
      </head>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased scrollbar`}
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
