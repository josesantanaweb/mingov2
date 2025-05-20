import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Outfit } from 'next/font/google';

import '@/styles/globals.css';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';
import Providers from '@/components/providers';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '900'],
});

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'Bingo',
  description: 'Bingo game',
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="es">
      <body className={outfit.className}>
        <Providers>
          <main className="relative w-full h-screen grid grid-rows-[64px_1fr]">
            <Navbar />
            <div className="w-full flex h-full">
              <Sidebar />
              <div className="bg-base-700 w-full">{children}</div>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
