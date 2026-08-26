import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGitHubPages ? "/my-multilingual-classroom" : "",
  assetPrefix: isGitHubPages ? "/my-multilingual-classroom/" : "",
  turbopack: {
    root: process.cwd()
  }
};

export default nextConfig;
