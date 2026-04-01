import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Merriweather, Fira_Code } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import FooterSection from "@/components/footer";
import { CursorGlow, ThemeProvider, TopLoader, CookieConsent } from "@/Provider";
import { GoogleTagManager } from "@next/third-parties/google";

// const preconnectDomains = [
//   "https://images.unsplash.com",
//   "https://res.cloudinary.com",
// ];

const fontSans = Space_Grotesk({
  variable: "--font-grotesk-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "700"], // Only these 3 weights
});

const fontSerif = Merriweather({
  variable: "--font-merriweather-serif",
  subsets: ["latin"],
  display: "swap",
  // preload: true,
  weight: ["400", "700"], // Only these 2 weights
});

const fontMono = Fira_Code({
  variable: "--font-fira-mono",
  subsets: ["latin"],
  display: "swap",
  // preload: true,
  weight: ["400", "500", "700"], // Only these 3 weights
});
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),

  title: "Hrushikesh Shinde | Application Security & VAPT Specialist",
  description:
    "Associate Information Security Consultant specializing in Application Security, VAPT, OWASP Top 10, and web app security testing in Mumbai, India.",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
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
    yandex: `${process.env.NEXT_YANDEX_CONSOLE}`,
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
    <html
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning={true}
    >
      <head>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />

        {/* {preconnectDomains.map((domain) => (
          <link key={domain} rel="preconnect" href={domain} />
        ))}
        {preconnectDomains.map((domain) => (
          <link key={`dns-${domain}`} rel="dns-prefetch" href={domain} />
        ))} */}
        <meta name="apple-mobile-web-app-title" content="Hrushikesh Shinde" />
      </head>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased scrollbar`}
      >
        <Header />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 min-h-dvh">
            {children}
          </main>
        </ThemeProvider>
        <FooterSection />
        <CursorGlow />
        <TopLoader />
        <CookieConsent />
      </body>
    </html>
  );
}
