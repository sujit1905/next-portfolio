import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ─── Security Headers ───────────────────────────────────────────────────────
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
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self'",
              "connect-src 'self' https://api.resend.com https://vitals.vercel-insights.com",
              "media-src 'self'",
              "frame-src 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },

  // ─── Image Optimization ─────────────────────────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // ─── Experimental ───────────────────────────────────────────────────────────
  // Note: optimizeCss is intentionally disabled — it requires the 'critters'
  // package (not installed). Re-enable with: npm install critters
  // experimental: { optimizeCss: true },

  // ─── TypeScript ────────────────────────────────────────────────────────────────
  typescript: {
    ignoreBuildErrors: false,
  },

  // ─── Redirect /resume to PDF ────────────────────────────────────────────────
  async redirects() {
    return [
      {
        source: '/resume',
        destination: '/resume.pdf',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
