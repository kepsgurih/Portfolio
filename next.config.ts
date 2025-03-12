import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'snksfds830.ufs.sh',
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: 'utfs.io',
        port: "",
        pathname: "/**"
      },
    ]
  }
};

export default nextConfig;
