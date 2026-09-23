import type { Metadata, Viewport } from 'next';
import { Barlow, Barlow_Condensed, Big_Shoulders } from 'next/font/google';
import './globals.css';

const display = Big_Shoulders({ subsets: ['latin'], weight: ['600', '800', '900'], variable: '--font-big-shoulders' });
const cond = Barlow_Condensed({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-barlow-cond' });
const sans = Barlow({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-barlow' });

const siteUrl = 'https://digvijay-chavda.vercel.app';
const title = 'Digvijay Chavda · Software Engineer';
const description = 'Software engineer building production React, TypeScript and Next.js apps.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: 'Digvijay Chavda · Portfolio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: title }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.jpg'],
  },
};

export const viewport: Viewport = { themeColor: '#0a0b0a' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${cond.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
