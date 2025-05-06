import { useRoomQuery } from '@/__generated__/graphql';

const DEFAULT_ROOM: NonNullable<
  ReturnType<typeof useRoomQuery>['data']
>['room'] = {
  id: '',
  name: '',
  award: 0,
  status: false,
  time: new Date(),
  price: 0,
  users: [],
  cards: [],
  drawnNumbers: [],
};

export const useRoom = (id: string) => {
  const { data, error, loading } = useRoomQuery({
    variables: { id },
  });

  return {
    data: data?.room || DEFAULT_ROOM,
    error,
    loading,
  };
};
