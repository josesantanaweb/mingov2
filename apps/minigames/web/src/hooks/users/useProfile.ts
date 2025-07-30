import { useProfileQuery } from '@/__generated__/graphql';
import { useSession } from 'next-auth/react';

export const useProfile = () => {
  const { data: session } = useSession();
  const { data, error, loading } = useProfileQuery({
    variables: {},
    fetchPolicy: 'network-only',
    skip: !session?.user?.email,
  });

  return {
    data: data?.profile || null,
    error,
    loading,
  };
};
