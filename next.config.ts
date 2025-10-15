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
      {
         protocol: "https",
        hostname: 'bangtek.org',
        port: "",
        pathname: "/**"
      },
       {
         protocol: "https",
        hostname: 'theravickya.com',
        port: "",
        pathname: "/**"
      },
      {
        protocol: 'https',
        hostname: 'vvww7urwngdjce9l.public.blob.vercel-storage.com',
        pathname: "/**"
      }
    ]
  },
  experimental: {
    useCache: true,
  }
};

export default nextConfig;
