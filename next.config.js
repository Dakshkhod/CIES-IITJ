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
      'cdn.sanity.io', // Sanity CMS images
      'images.unsplash.com', // Developer avatars
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers for security, performance, and SEO.
  // Note: 'unsafe-inline'/'unsafe-eval' on script-src are currently required by
  // the embedded Sanity Studio (/studio) and the Next.js runtime. This is a
  // documented limitation; nonce-based CSP is planned hardening.
  async headers() {
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com https://placehold.co https://*.iitj.ac.in https://lh3.googleusercontent.com",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "connect-src 'self' https://*.sanity.io https://*.apicdn.sanity.io wss://*.sanity.io https://*.neon.tech",
      "frame-src 'self' https://www.google.com https://maps.google.com https://www.youtube.com",
      "worker-src 'self' blob:",
      "media-src 'self' data:",
      'upgrade-insecure-requests',
    ].join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // SAMEORIGIN allows Vercel deployment preview iframe; use DENY if you prefer stricter security
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
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
          // SEO: Tell search engines to index and follow all pages
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
        ],
      },
      // Static assets — long cache for better Core Web Vitals
      {
        source: '/(.*)\\.(jpg|jpeg|png|gif|ico|svg|webp|avif|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
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
