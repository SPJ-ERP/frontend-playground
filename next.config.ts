import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    remotePatterns: [
      {
        hostname: "ui-avatars.com",
        protocol: "https",
        port: "",
        pathname: "/**",
      }
    ],
    unoptimized: process.env.NODE_ENV === "development",
  },
  experimental: {
    mcpServer: true,
  },
};

export default nextConfig;
