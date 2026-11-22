import type { NextConfig } from "next"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)
const monorepoRoot = path.resolve(dirname, "../../")

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui"],
  turbopack: {
    root: monorepoRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
