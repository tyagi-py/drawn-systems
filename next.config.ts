import type { NextConfig } from "next";

/**
 * For a GitHub Pages project site (username.github.io/repo-name), the app is
 * served from a subpath. Set NEXT_PUBLIC_BASE_PATH (e.g. "/repo-name") at
 * build time; leave it unset for a root site (username.github.io) or local dev.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Lets other devices on the local network (phone, another machine) reach
  // `next dev`'s HMR/asset endpoints. Dev-only; irrelevant to the static
  // export build. Add more IPs here if you test from other LAN devices.
  allowedDevOrigins: ["192.168.31.186"],
  // Hides the floating dev-mode route indicator badge. Dev-only; never
  // renders in the production/static build regardless of this setting.
  devIndicators: false,
};

export default nextConfig;
