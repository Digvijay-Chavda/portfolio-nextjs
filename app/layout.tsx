import type { Metadata, Viewport } from 'next';
import { Barlow, Barlow_Condensed, Big_Shoulders, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const display = Big_Shoulders({ subsets: ['latin'], weight: ['600', '800', '900'], variable: '--font-big-shoulders' });
const cond = Barlow_Condensed({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-barlow-cond' });
const sans = Barlow({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-barlow' });
// Professional theme's fonts — kept separate from the Evil theme's fonts above.
const proSans = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-inter' });
const proMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-jetbrains-mono' });

const siteUrl = 'https://digvijay-chavda.vercel.app';
const title = 'Digvijay Chavda · Software Developer';
const description = 'Software developer building production React, TypeScript and Next.js apps.';

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

// Runs synchronously before React hydrates, so a returning Evil-preferring visitor's
// reload doesn't show a frame of Professional content — ThemeGate reads this same
// data attribute to cover the screen instantly until the real Evil DOM is ready.
const THEME_BOOT_SCRIPT = `try{var t=window.localStorage.getItem('portfolio:theme');if(t==='evil')document.documentElement.dataset.themeBoot='evil';}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${cond.variable} ${sans.variable} ${proSans.variable} ${proMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
