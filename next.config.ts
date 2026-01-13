import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/my-blog',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
