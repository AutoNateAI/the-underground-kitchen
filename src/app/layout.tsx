import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BRAND } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${BRAND.name} | ${BRAND.tagline}`,
  description: BRAND.description,
  keywords: ['burgers', 'Grand Rapids', 'restaurant', 'catering', 'local food'],
  openGraph: {
    title: BRAND.name,
    description: BRAND.description,
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: BRAND.name,
    telephone: BRAND.phone,
    email: BRAND.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Grand Rapids',
      addressRegion: 'MI',
      addressCountry: 'US',
    },
    servesCuisine: 'American, Burgers',
    priceRange: '$$',
  };

  return (
    <html lang="en">
      <body className={`${inter.className} noise-overlay custom-scrollbar`}>
        <Navigation />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}




