import type { NextConfig } from "next";

const repoName = "Threekit-Report-Mimic";
const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: isPages ? `/${repoName}` : "",
  assetPrefix: isPages ? `/${repoName}/` : "",
  reactStrictMode: true,
};

export default nextConfig;
