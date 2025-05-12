'use client';
import React from 'react';

import Room from '@/components/bingo/room';
import { useRooms } from '@/hooks/rooms/useRooms';

const Rooms = (): React.ReactElement => {
  const { data: rooms } = useRooms();
  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex items-center gap-5 h-[90px] justify-center">
        <h4 className="text-2xl font-semibold text-white uppercase">
          Elige tu sala
        </h4>
      </div>
      <div className="grid items-center justify-center w-full grid-cols-3 gap-10 py-10">
        {rooms.map((room, index: number) => {
          return <Room key={index} room={room} />;
        })}
      </div>
    </div>
  );
};

export default Rooms;
