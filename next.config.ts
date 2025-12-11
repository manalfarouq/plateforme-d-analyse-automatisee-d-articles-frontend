/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'http://127.0.0.1:8000/:path*', // Service Auth
      },
      {
        source: '/api/analyse/:path*',
        destination: 'http://127.0.0.1:8001/:path*', // Service Gemini (port 8001)
      },
    ];
  },
};

module.exports = nextConfig;