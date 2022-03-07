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
  async rewrites() {
    return [
      { source: "/login", destination: "/api/login" },
      { source: "/logout", destination: "/api/logout" },
    ];
  },
  eslint: {
    dirs: ["src/"],
  },
};

module.exports = nextConfig;
