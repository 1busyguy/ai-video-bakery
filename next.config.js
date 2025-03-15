/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'], // Add any domains you'll be loading images from
  },
  env: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
  // This is needed for Stripe webhooks
  async headers() {
    return [
      {
        source: '/api/webhooks/stripe',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  },
  // Ignore ESLint errors during production build
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during production build
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
  // Disable server-side rendering for pages with useSearchParams
  experimental: {
    // This is the recommended approach for Next.js 14+
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

module.exports = nextConfig; 