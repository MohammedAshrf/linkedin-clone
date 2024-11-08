import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "links.papareact.com",
      },
      {
        protocol: "https",
        hostname: "image.clerk.com",
      },
      {
        protocol: "https",
        hostname: ".windows.net",
      },
    ],
  },
};

export default nextConfig;
