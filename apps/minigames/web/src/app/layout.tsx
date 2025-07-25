import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@/styles/globals.css';
import { Footer, Header } from '@mingo/shared';
import { MENU } from '@/constants/routes';

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'Mingo',
  description: 'Mingo is a platform for betting on the outcome of AI models.',
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="es">
      <body>
        <main className="relative w-full flex items-center justify-center bg-black">
          <div className="bg-base-900 w-full md:max-w-md h-full flex flex-col min-h-screen relative">
            <Header />
            {children}
            <Footer menu={MENU} />
          </div>
        </main>
      </body>
    </html>
  );
}
