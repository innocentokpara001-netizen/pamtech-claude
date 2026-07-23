import type { Metadata } from 'next';
import './globals.css';
import { cssVars } from '@/lib/brand';
import { site } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import LegacyHashRedirect from '@/components/LegacyHashRedirect';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_NG',
  },
};

/** Brand tokens → CSS custom properties, emitted once at the root.
 *  React passes unknown `--*` keys straight through to the style attribute. */
const rootStyle = cssVars as unknown as React.CSSProperties;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-NG" style={rootStyle}>
      <head>
        {/*
          Marks JS as available before first paint, so reveal elements can
          start hidden without ever risking invisible text for a user
          whose JS fails. Inline and synchronous by design.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <LegacyHashRedirect />
        <SmoothScroll />
        <Header />

        <main id="main">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
