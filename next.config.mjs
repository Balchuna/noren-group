/** NOREN GROUP — Visualizer (protótipo navegável, sem backend)
 *  Export estático: o resultado vive em /out e pode ser hospedado em
 *  qualquer CDN. O basePath é controlado por NEXT_PUBLIC_BASE_PATH para
 *  permitir publicação em subdiretório (GitHub Pages).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
