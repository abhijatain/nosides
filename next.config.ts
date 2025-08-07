import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "http://192.168.1.19:3000",
    "http://localhost:3000",
  ],
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint warnings during `next build`
  },
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors during `next build`
  },
};

export default nextConfig;
