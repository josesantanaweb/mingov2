import { useSubscription } from '@apollo/client';

import { ROOM_STARTED_SUBSCRIPTION } from '@/api/graphql/subscription/rooms';

interface RoomStartedInput {
  roomStarted: {
    roomId: string;
    message: string;
  };
}

export const useRoomStarted = () => {
  const { data, loading, error } = useSubscription<RoomStartedInput>(
    ROOM_STARTED_SUBSCRIPTION,
  );

  return {
    data: data?.roomStarted,
    loading,
    error,
  };
};
