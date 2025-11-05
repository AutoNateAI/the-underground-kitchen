/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/the-underground-kitchen',
  assetPrefix: '/the-underground-kitchen',
  images: {
    unoptimized: true, // Required for static export
    domains: ['firebasestorage.googleapis.com'],
  },
};

module.exports = nextConfig;




