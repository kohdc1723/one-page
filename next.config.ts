import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    
    return config;
  },
  // experimental: {
  //   turbo: {
  //     resolveAlias: {
  //       canvas: './empty-module.ts',
  //     },
  //   },
  // },
  // swcMinify: false,
};

export default nextConfig;
