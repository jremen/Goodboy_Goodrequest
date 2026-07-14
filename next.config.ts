import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    cssChunking: "strict",
  },
};

export default nextConfig;
