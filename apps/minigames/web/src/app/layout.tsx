import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@/styles/globals.css';
import Providers from '@/components/common/providers';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';

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
        <Providers>
          <main className="relative w-full flex items-center justify-center md:p-10 bg-black">
            <div className="bg-base-900 w-full md:max-w-md h-full flex flex-col min-h-screen">
              <Header />
              {children}
              <Footer />
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
