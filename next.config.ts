import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const cspHeader = [
  "default-src 'self'",

  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com${isDev ? " 'unsafe-eval'" : ""}`,

  // FIXED
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.googletagmanager.com",

  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https:",

  // FIXED (fonts)
  "font-src 'self' https://fonts.gstatic.com data:",

  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https:",

  "frame-src 'self' https://www.googletagmanager.com",

  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  /* config options here */

  compress: true,
  productionBrowserSourceMaps: false, // Reduces payload
  reactStrictMode: true,
  reactCompiler: true,
  transpilePackages: ["next-mdx-remote"],
  // turbopack: {
  //   resolveAlias: {
  //     "../build/polyfills/polyfill-module": "./lib/modern-polyfill.js",
  //     "next/dist/build/polyfills/polyfill-module": "./lib/modern-polyfill.js",
  //   },
  // },
  async redirects() {
    return [
      {
        source: "/blog/reconspider-web-enumeration-guide",
        destination: "/blog/reconspider-htb-web-enumeration-tool",
        permanent: true, // 308 redirect (SEO friendly)
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
          },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      
    ],
  },

  experimental: {
    inlineCss: true,
    optimizeCss: true,
    turbopackFileSystemCacheForDev: true,
    turbopackMinify: true,
    optimizePackageImports: [
      "lodash-es", // ✅ Tree-shake
      "lucide-react",
      "react-icons/*",
      "framer-motion",
    ],
  },

  compiler: {
    removeConsole: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
