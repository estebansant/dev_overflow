import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        port: "",
      },
    ],
  },
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
