/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/sections/:index",
        destination: "/section/:index",
        permanent: false,
      },
    ];
  },
  eslint: {
    dirs: ["src/"],
  },
};

module.exports = nextConfig;
