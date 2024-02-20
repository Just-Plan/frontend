/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "*"],
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        destination: "https://maps.googleapis.com/maps/:path*",
        source: "/google/:path*",
      },
      {
        destination: "https://dapi.kakao.com/:path*",
        source: "/kakao/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
