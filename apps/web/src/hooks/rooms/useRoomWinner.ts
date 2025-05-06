import { useSubscription } from '@apollo/client';

import { ROOM_WINNER_SUBSCRIPTION } from '@/api/graphql/subscription/rooms';

interface RoomWinnerData {
  roomWinner: {
    roomId: string;
    winnerCard: {
      number: number;
    };
    winnerUser: {
      name: string;
    };
  };
}

export const useRoomWinner = (roomId: string) => {
  const { data, loading, error } = useSubscription<
    RoomWinnerData,
    { roomId: string }
  >(ROOM_WINNER_SUBSCRIPTION, {
    variables: { roomId },
  });

  return {
    data: data?.roomWinner,
    loading,
    error,
  };
};
