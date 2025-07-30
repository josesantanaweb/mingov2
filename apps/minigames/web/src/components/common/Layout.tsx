'use client';

import { signOut, useSession } from 'next-auth/react';
import { Header, Footer } from '@mingo/components';
import { MENU } from '@/constants/routes';
import { useRouter } from 'next/navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogin = () => router.push('/login');

  const handleRegister = () => router.push('/register');

  const handleLogout = () => {
    signOut();
    router.push('/login');
  };

  return (
    <main className="relative w-full flex items-center justify-center bg-black">
      <div className="bg-base-900 w-full md:max-w-md flex flex-col min-h-screen">
        <Header
          balance={500}
          avatar={session?.user?.image || '/images/users/default-avatar.png'}
          hasSession={!!session}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onLogout={handleLogout}
        />
        <main className="flex-1">{children}</main>
        <Footer menu={MENU} />
      </div>
    </main>
  );
};

export default Layout;
