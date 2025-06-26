import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@/styles/globals.css';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';
import Providers from '@/components/providers';

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
      <body>
        <Providers>
          <main className="relative w-full h-screen grid grid-rows-[64px_1fr]">
            <Navbar />
            <div className="w-full flex h-full">
              <Sidebar />
              <div className="bg-base-800 w-full">{children}</div>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
