'use client';
import React from 'react';
import Room from '@/components/bingo/room';
import { useRooms } from '@/hooks/rooms/useRooms';
import Footer from '@/components/layout/game/footer';
import Wrapper from '@/components/layout/game/wrapper';
import Skeleton from '@/components/bingo/room/Skeleton';

const Rooms = (): React.ReactElement => {
  const { data: rooms, loading } = useRooms();
  return (
    <Wrapper>
      <div className="w-full flex items-center gap-5 justify-center py-10">
        <h4 className="text-2xl font-semibold text-white uppercase">
          Elige una sala
        </h4>
      </div>
      <div className="flex items-center justify-center gap-20 py-20 flex-wrap w-full">
        {!loading &&
          rooms.map((room, index: number) => {
            return <Room key={index} room={room} />;
          })}

        {loading &&
          Array.from({ length: 6 }).map((_, index: number) => {
            return <Skeleton key={index} />;
          })}
      </div>
      <Footer />
    </Wrapper>
  );
};

export default Rooms;
