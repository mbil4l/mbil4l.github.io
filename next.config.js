/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Uncomment and set this if deploying to a subdirectory like username.github.io/repo-name
  // basePath: '/repo-name',
  // assetPrefix: '/repo-name/',
};

module.exports = nextConfig;
