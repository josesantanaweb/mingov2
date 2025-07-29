'use client';
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

import { makeClient } from '@/api/client';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </ApolloNextAppProvider>
  );
};

export default Providers;
