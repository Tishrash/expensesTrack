/** @type {import('next').NextConfig} */
const repo = 'expensesTrack'; // 👉 මෙතැන ඔබේ GitHub repo නම දාන්න

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
