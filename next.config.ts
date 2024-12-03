import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['picsum.photos'],
  },
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
};

export default nextConfig;
