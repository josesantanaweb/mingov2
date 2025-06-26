'use client';
import Image from 'next/image';
import React from 'react';
import { ILeague } from './types';

interface EventItemProps {
  league: ILeague;
  isEvent?: boolean;
}

const EventItem = ({ league, isEvent }: EventItemProps) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      {isEvent && (
        <Image
          src={league.logo}
          alt={league.name}
          width={18}
          height={18}
          className="rounded-full w-5 h-5"
        />
      )}
      <p
        className={`text-sm font-medium transition-all ${isEvent ? 'text-white' : 'text-base-300 hover:text-white'}`}
      >
        {league.name}
      </p>
      <p className="text-base-200 text-xs bg-base-400 rounded-full w-5 h-5 flex items-center justify-center font-sans">
        {league.count}
      </p>
    </div>
  );
};

export default EventItem;
