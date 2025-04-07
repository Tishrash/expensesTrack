/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Add basePath if your site is not at the root of the domain
  // basePath: '/expensesTrack',
  // Add trailingSlash for GitHub Pages compatibility
  trailingSlash: true,
}

module.exports = nextConfig 