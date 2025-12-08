import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false, // React 19 호환성을 위해 추가
  typescript: {
    // React 19 타입 호환성
    ignoreBuildErrors: false
  },
  turbopack: {
    root: __dirname
  }
};

export default nextConfig;
