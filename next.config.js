/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Enable SWC minification for better performance
  swcMinify: true,


  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: [
      'placehold.co', // For development placeholders
      'cies.iitj.ac.in', // Production domain
      'iitj.ac.in', // IIT Jodhpur domain
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Environment variables
  env: {
    CUSTOM_KEY: 'value',
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      // Add any redirects here
    ];
  },

  // Rewrites
  async rewrites() {
    return [
      // Add any rewrites here
    ];
  },

  // Webpack configuration
  webpack: (config) => {
    // Custom webpack config if needed
    return config;
  },

  // Output configuration for static export (if needed)
  // trailingSlash: true,
  // output: 'export',
};

module.exports = nextConfig;
