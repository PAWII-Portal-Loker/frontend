import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "https://api-portaloker.fanesp.online/api/:path*",
      },
    ];
  },
};

export default nextConfig;
