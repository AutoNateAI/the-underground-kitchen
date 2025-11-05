/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true, // Required for static export
    domains: ['firebasestorage.googleapis.com'],
  },
};

module.exports = nextConfig;




