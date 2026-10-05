import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Bodoni_Moda } from 'next/font/google';
import { Cursor } from '@/components/Cursor';
import { Header } from '@/components/Header';
import { TransitionProvider } from '@/components/TransitionProvider';
import './globals.css';

/**
 * Police d'affichage : Bodoni Moda est le plus proche de la maquette parmi les Google Fonts.
 * Si tu utilises une autre police dans Figma, change-la ICI (et nulle part ailleurs).
 */
const display = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Arnaud Quatrevaux — Front-end developer & designer',
    template: '%s — Arnaud Quatrevaux',
  },
  description:
    'Portfolio d’Arnaud Quatrevaux, développeur front-end et designer freelance basé à Paris.',
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={display.variable}>
      <body>
        <noscript>
          <style>{`[data-enter],[data-line],.entry,li{opacity:1!important}[data-reveal]{clip-path:none!important}`}</style>
        </noscript>
        <TransitionProvider>
          <Header />
          {children}
          <Cursor />
        </TransitionProvider>
      </body>
    </html>
  );
}
