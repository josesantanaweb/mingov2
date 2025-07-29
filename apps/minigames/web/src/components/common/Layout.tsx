'use client';

import { useSession } from 'next-auth/react';
import { Header, Footer } from '@mingo/components';
import { MENU } from '@/constants/routes';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  return (
    <main className="relative w-full flex items-center justify-center bg-black">
      <div className="bg-base-900 w-full md:max-w-md flex flex-col min-h-screen">
        <Header
          amount={10000}
          avatar={session?.user?.image || '/images/users/default-avatar.png'}
        />
        <main className="flex-1">{children}</main>
        <Footer menu={MENU} />
      </div>
    </main>
  );
};

export default Layout;
