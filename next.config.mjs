/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable SWR caching for static assets
  headers: async () => {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Experimental optimizations
  experimental: {
    turbo: {}, // Turbopack for faster builds
    optimizePackageImports: [
      'gsap',
      'react-three-fiber',
      'three',
    ],
  },

  // Enable compression
  compress: true,

  // Optimize production builds
  productionBrowserSourceMaps: false,

  // Trailing slashes
  trailingSlash: false,

  // Middleware for caching strategy
  onDemandEntries: {
    maxInactiveAge: 60000,
    pagesBufferLength: 5,
  },
};

export default nextConfig;