import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Force webpack instead of turbopack
  experimental: {
    webpackBuildWorker: false,
  },
  // Skip TypeScript check during build (we run it separately)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable output file tracing (the race condition seems to happen during trace collection)
  outputFileTracing: false,
};

export default nextConfig;
