/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        destination: "https://maps.googleapis.com/maps/:path*",
        source: "/google/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
