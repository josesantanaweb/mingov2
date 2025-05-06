import { useRoomsQuery } from '@/__generated__/graphql';

export const useRooms = () => {
  const { data, error, loading } = useRoomsQuery({
    variables: {},
  });

  return {
    data: data?.rooms || [],
    error,
    loading,
  };
};
