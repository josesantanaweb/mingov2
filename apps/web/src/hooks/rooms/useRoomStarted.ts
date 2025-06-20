import { useSubscription } from '@apollo/client';

import { ROOM_STARTED_SUBSCRIPTION } from '@/api/graphql/subscription/rooms';

interface RoomStartedInput {
  roomStarted: {
    roomId: string;
  };
}

export const useRoomStarted = (roomId: string) => {
  const { data, loading, error } = useSubscription<RoomStartedInput>(
    ROOM_STARTED_SUBSCRIPTION,
    {
      variables: { roomId },
      skip: !roomId,
    },
  );

  return {
    data: data?.roomStarted,
    loading,
    error,
  };
};
