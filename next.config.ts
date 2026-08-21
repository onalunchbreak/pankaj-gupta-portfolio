import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  poweredByHeader: false,
  // Reduce client bundle size → faster Vercel cold starts
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    // Tree-shake large icon/animation packages — only import what's used
    optimizePackageImports: ["framer-motion", "lucide-react", "gsap"],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
