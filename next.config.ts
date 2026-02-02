import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false, // Next.js 16에서 experimental에서 이동
  typescript: {
    // React 19 타입 호환성
    ignoreBuildErrors: false
  },
  transpilePackages: ['react-markdown', 'remark-math', 'rehype-katex', 'remark-gfm']
};

export default nextConfig;
