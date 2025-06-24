/** @type {import('next').NextConfig} */
const repo = 'expensesTrack'; // ඔබේ GitHub repo name එක

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  trailingSlash: true,
};

module.exports = nextConfig;
