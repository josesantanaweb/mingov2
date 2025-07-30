'use client';

import { signOut, useSession } from 'next-auth/react';
import { Header, Footer } from '@mingo/components';
import { MENU } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/hooks/users/useProfile';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: profileData, loading: profileLoading } = useProfile();

  const isLoading =
    status === 'loading' ||
    (status === 'authenticated' && profileLoading) ||
    (session && profileLoading);

  const handleLogin = () => router.push('/login');

  const handleRegister = () => router.push('/register');

  const handleLogout = () => {
    signOut();
    router.push('/login');
  };

  const profile = {
    balance: profileData?.balance || 0,
    image: profileData?.image || '',
    hasSession: !!session,
    isLoading,
  };

  const actions = {
    onLogin: handleLogin,
    onRegister: handleRegister,
    onLogout: handleLogout,
  };

  return (
    <main className="relative w-full flex items-center justify-center bg-black">
      <div className="bg-base-900 w-full md:max-w-md flex flex-col min-h-screen">
        <Header profile={profile} actions={actions} />
        <main className="flex-1">{children}</main>
        <Footer menu={MENU} />
      </div>
    </main>
  );
};

export default Layout;
