'use client';
import React from 'react';
import Image from 'next/image';

import { IMatch } from '@/types/match';

interface MatchCardProps {
  data: IMatch;
  isActive?: boolean;
}

const MatchCard = ({
  data,
  isActive = false,
}: MatchCardProps): React.ReactElement => {
  const cardClass = isActive
    ? 'bg-gradient-to-r from-primary-600 to-primary-900'
    : 'bg-base-800';

  return (
    <div
      className={`flex flex-shrink-0 flex-col w-[291px] h-[163px] rounded-xl text-white p-3 ${cardClass}`}
    >
      <div className="w-full flex items-center justify-center mb-4">
        <h6 className="text-base font-medium">{data.league}</h6>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2 flex-col">
          <Image
            width={50}
            height={50}
            src={data.homeTeam.logo}
            alt="Team 1"
            className="w-12 h-12 rounded-full object-contain object-center"
          />
          <p className="text-xs font-semibold">{data.homeTeam.name}</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <p className="text-3xl font-semibold">3</p>
            <p className="text-3xl font-semibold">:</p>
            <p className="text-3xl font-semibold">0</p>
          </div>
          <p className="text-center text-sm font-medium">2T</p>
        </div>
        <div className="flex items-center gap-2 flex-col">
          <Image
            width={50}
            height={50}
            src={data.awayTeam.logo}
            alt="Team 1"
            className="w-12 h-12 rounded-full object-contain object-center"
          />
          <p className="text-xs font-semibold">{data.awayTeam.name}</p>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
