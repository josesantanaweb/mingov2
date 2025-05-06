import { useProfileQuery } from '@/__generated__/graphql';

export const useProfile = () => {
  const { data, error, loading } = useProfileQuery({
    variables: {},
    fetchPolicy: 'cache-first',
  });

  return {
    data: data?.profile || null,
    error,
    loading,
  };
};
