'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import Room from '@/components/bingo/room';
import Award from '@/components/award';
import Panel from '@/components/panel';
import Users from '@/components/users/Users';
import RoomName from '@/components/bingo/room-name';
import Game from '@/components/bingo/game';
import { useRoomStarted } from '@/hooks/rooms/useRoomStarted';
import { MAX_USERS_TO_SHOW } from '@/constants';
import { useRoom } from '@/hooks/rooms/useRoom';

const RoomWrapper = (): React.ReactElement => {
  const { room: roomParam } = useParams();
  const roomId = typeof roomParam === 'string' ? roomParam : '';
  const { data: roomStarted } = useRoomStarted(roomId);
  const { data: room } = useRoom(roomId);
  const users = room.users?.slice(0, MAX_USERS_TO_SHOW);
  const remainingCount =
    (room && (room.users?.length ?? 0) - MAX_USERS_TO_SHOW) ?? 0;
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    if (roomStarted?.roomId === roomId) {
      setIsGameStarted(true);
    }
  }, [roomId, roomStarted]);

  if (isGameStarted) return <Game roomId={roomId} />;

  return (
    <div className="flex w-full h-full p-5">
      <Panel room={room} />
      <div className="flex flex-col items-center justify-start w-full gap-[100px]">
        <RoomName name={room.name} />
        <div className="flex items-center h-full">
          <Room room={room} />
        </div>
      </div>
      <div className="flex flex-col min-w-[120px] gap-10 items-end">
        <Award award={room.award} />
        {(users ?? []).length > 0 && (
          <Users users={users ?? []} remainingCount={remainingCount} />
        )}
      </div>
    </div>
  );
};

export default RoomWrapper;
