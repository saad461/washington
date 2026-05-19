import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
  compress: true,
  experimental: {
    optimizeCss: true,
  },

  // Bypass Windows path-casing collision that crashes _error.js prerender locally.
  // Vercel Linux builds are unaffected.
  typescript: {
    ignoreBuildErrors: true,
  },

  /*
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': path.resolve(__dirname, 'node_modules', 'react'),
      'react/jsx-runtime': path.resolve(__dirname, 'node_modules', 'react', 'jsx-runtime'),
      'react-dom': path.resolve(__dirname, 'node_modules', 'react-dom'),
    };
    return config;
  },
  */

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
          },
        ],
      },
      {
        source: '/img/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
