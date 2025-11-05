/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
    domains: ['firebasestorage.googleapis.com'],
  },
  // Set base path if your repo name is not at root (uncomment and adjust if needed)
  // basePath: '/your-repo-name',
};

module.exports = nextConfig;




