import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ThemeProvider } from '@/context/theme-context';
import { Toaster } from '@/components/ui/toaster';
import { GlobalCommandPalette } from '@/components/global-command-palette';
import { cn } from '@/lib/utils';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://litepanel.vercel.app'),
  title: {
    default: 'LiteControl Admin - Next.js Admin Dashboard Template',
    template: '%s | LiteControl Admin',
  },
  description:
    'A fully-typed Next.js 15 admin template with hot-swappable themes, built with TypeScript, Tailwind CSS, and shadcn/ui components.',
  keywords: [
    'nextjs',
    'admin-template',
    'dashboard',
    'typescript',
    'tailwindcss',
    'shadcn-ui',
    'themes',
    'react',
  ],
  authors: [
    {
      name: 'LiteControl Team',
      url: 'https://github.com/xenral/litepanel',
    },
  ],
  creator: 'LiteControl Team',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://litepanel.vercel.app',
    title: 'LiteControl Admin - Next.js Admin Dashboard Template',
    description:
      'A modern, fully-customizable admin dashboard template with hot-swappable themes.',
    siteName: 'LiteControl Admin',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LiteControl Admin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LiteControl Admin - Next.js Admin Dashboard Template',
    description:
      'A fully-typed Next.js 15 admin template with hot-swappable themes',
    images: ['/og-image.png'],
    creator: '@yourusername',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

/**
 * Root layout component that wraps the entire application
 * Provides theme context, global styles, and essential providers
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          'bg-background min-h-screen font-sans antialiased'
        )}
      >
        <NextThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <ThemeProvider>
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
            </div>
            <Toaster />
            <GlobalCommandPalette />
          </ThemeProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
