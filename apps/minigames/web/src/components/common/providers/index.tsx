'use client';
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

import { makeClient } from '@/api/graphql/client';
import { TranslationProvider } from '@/contexts/TranslationProvider';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      <SessionProvider>
        <TranslationProvider>{children}</TranslationProvider>
      </SessionProvider>
    </ApolloNextAppProvider>
  );
};

export default Providers;
