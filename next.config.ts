import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Exclude SVGs from Next.js default file loader
    const fileLoaderRule = config.module.rules.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (rule: any) => rule.test && rule.test.test?.(".svg")
    );
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    // Add SVGR loader for SVG imports as React components
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tmvbd.bondstein.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
const { i18n } = require("./i18.config");
module.exports = { i18n };
