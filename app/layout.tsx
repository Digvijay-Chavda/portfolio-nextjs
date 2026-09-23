import type { Metadata, Viewport } from 'next';
import { Barlow, Barlow_Condensed, Big_Shoulders } from 'next/font/google';
import './globals.css';

const display = Big_Shoulders({ subsets: ['latin'], weight: ['600', '800', '900'], variable: '--font-big-shoulders' });
const cond = Barlow_Condensed({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-barlow-cond' });
const sans = Barlow({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-barlow' });

export const metadata: Metadata = {
  title: 'Digvijay Chavda · Software Engineer',
  description: 'Software engineer building production React, TypeScript and Next.js apps.',
};

export const viewport: Viewport = { themeColor: '#0a0b0a' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${cond.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
