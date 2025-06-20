'use client';
import React from 'react';
import type { ReactElement } from 'react';
import Link from 'next/link';

import { useCountdown } from '@/hooks';
import { ROOM_ROUTE } from '@/constants';
import type { RoomQuery } from '@/__generated__/graphql';

import { backgroundClasses, borderClasses, textClasses } from './classes';
interface RoomProps {
  room: RoomQuery['room'];
}

const Room = ({ room }: RoomProps): ReactElement => {
  const { award, price, time, name } = room;

  const targetDate = new Date(time);
  const timeLeft = useCountdown(targetDate) || '00:00:00';

  const borderClass = borderClasses[name.toLowerCase()] || 'bg-base-300';
  const backgroundClass =
    backgroundClasses[name.toLowerCase()] || 'bg-base-300';
  const textClass = textClasses[name.toLowerCase()] || 'text-white';

  return (
    <Link
      href={ROOM_ROUTE(room.id)}
      className="flex items-center justify-center gap-2 cursor-pointer w-1/4"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-20 rounded-lg bg-base-500" />
          <span className="w-6 h-20 rounded-lg bg-base-500" />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-20 rounded-lg bg-base-500" />
          <span className="w-6 h-20 rounded-lg bg-base-500" />
        </div>
      </div>
      <div
        className={`${borderClass} w-[210px] h-[250px] relative rounded-2xl p-0.5`}
      >
        <div className="flex flex-col items-center justify-center w-full h-full transition-all bg-base-500 hover:bg-base-400 rounded-2xl">
          <div
            data-testid="time-left"
            className={`absolute flex justify-center -top-3 w-[160px] translate-x-[-50%] left-1/2 px-3 rounded-lg ${backgroundClass}`}
          >
            <span className="text-lg font-semibold text-white">{timeLeft}</span>
          </div>
          <h4 className={`mb-10 text-2xl font-semibold uppercase ${textClass}`}>
            {name}
          </h4>
          <div className="flex flex-col items-center">
            <p className="text-sm font-semibold text-white">Premio</p>
            <h5 className={`text-xl font-semibold uppercase ${textClass}`}>
              {award} MGO
            </h5>
          </div>
          <div
            className={`absolute -bottom-3 translate-x-[-50%] left-1/2 px-3 rounded-lg ${backgroundClass}`}
          >
            <span className="text-lg font-semibold text-white">
              {price} MGO
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="w-6 h-20 rounded-lg bg-base-500" />
          <span className="w-2 h-20 rounded-lg bg-base-500" />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-20 rounded-lg bg-base-500" />
          <span className="w-2 h-20 rounded-lg bg-base-500" />
        </div>
      </div>
    </Link>
  );
};

export default Room;
