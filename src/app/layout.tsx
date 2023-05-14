'use client';
import './globals.css';
import 'tailwindcss/tailwind.css';

import { Inter } from 'next/font/google';

import { AppLayout } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>frenmo</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content="Send and request crypto from your frens" />
        <link rel="icon" href="/favicon.png?v=3" />
      </head>
      <body className={inter.className}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
