import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const cspHeader = [
  "default-src 'self'",
  // Keep dev usable and avoid breaking framework-managed inline bootstrapping.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  "connect-src 'self' https:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  /* config options here */
  
  compress: true,
  productionBrowserSourceMaps: false, // Reduces payload
  reactStrictMode: true,
  reactCompiler: true,
  transpilePackages: ["next-mdx-remote"],
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
    qualities: [50, 75,85],
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
      'lodash-es',      // ✅ Tree-shake
      'date-fns',       // ✅ Tree-shake
      '@mui/material',  // ✅ Tree-shake
      '@mui/icons-material',
      'react-icons',
      'framer-motion',  // ⚠️ Already somewhat optimized
    ],
    turbopackRemoveUnusedExports: true,
    turbopackRemoveUnusedImports: true,
    turbopackInferModuleSideEffects: true,
    cssChunking: true,
    },
      poweredByHeader: false,

};

export default nextConfig;
