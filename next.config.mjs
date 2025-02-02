/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['d33wubrfki0l68.cloudfront.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Add this rewrites section
  async rewrites() {
    return [
      {
        source: "/.netlify/functions/:path*",
        destination:
          "https://your-site-name.netlify.app/.netlify/functions/:path*",
      },
    ];
  },
};

export default nextConfig;
