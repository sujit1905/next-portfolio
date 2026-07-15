import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { createMetadata, personSchema, websiteSchema } from '@/lib/metadata';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import SmoothScrollProvider from '@/components/ui/SmoothScrollProvider';

// ─── Fonts ──────────────────────────────────────────────────────────────────
// Body font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

// Display font — Space Grotesk from Google Fonts (premium alternative, no files needed)
// TODO: For production, swap to Clash Display by:
//   1. Download from https://www.fontshare.com/fonts/clash-display
//   2. Place .woff2 files in public/fonts/
//   3. Replace this with: import localFont from 'next/font/local'
//      and configure the localFont() call
const clashDisplay = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-clash-display',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
});

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = createMetadata();

// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${clashDisplay.variable}`} suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        {/* PWA / Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0f" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className="bg-background text-text-primary font-body antialiased overflow-x-hidden">
        {/* Custom cursor — self-disables on touch devices */}
        <CustomCursor />

        {/* Lenis smooth scroll wrapper */}
        <SmoothScrollProvider>
          {/* Persistent navigation */}
          <Navbar />

          {/* Page content */}
          <main id="main-content" className="relative z-10">
            {children}
          </main>

          {/* Global footer */}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
