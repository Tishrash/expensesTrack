const repo = 'expensesTrack';

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
