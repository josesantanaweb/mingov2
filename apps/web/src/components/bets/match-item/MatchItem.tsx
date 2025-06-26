'use client';
import React from 'react';
import Image from 'next/image';

import { IMatch } from '@/types/match';
import { formatDay, formatHour } from '@/utils/date';

interface MatchItemProps {
  data: IMatch;
}

const MatchItem = ({ data }: MatchItemProps): React.ReactElement => {
  const hour = formatHour(data.date);
  const day = formatDay(data.date);

  return (
    <div className="bg-base-800 hover:bg-base-700 transition-all w-full text-white rounded-xl h-[75px] gap-5 flex items-center justify-center">
      <div className="flex items-center gap-3 flex-1 justify-end">
        <p className="text-xs font-semibold truncate max-w-[50px]">
          {data.homeTeam.name}
        </p>
        <Image
          width={50}
          height={50}
          src={data.homeTeam.logo}
          alt="Team 1"
          className="w-11 h-11 rounded-full object-contain object-center"
        />
      </div>
      <div className="flex flex-col gap-1 justify-center items-center">
        <p className="text-xs font-medium text-base-300 uppercase">{hour}</p>
        <p className="text-xs font-medium capitalize">{day}</p>
      </div>
      <div className="flex items-center gap-3 flex-1 justify-start">
        <Image
          width={50}
          height={50}
          src={data.awayTeam.logo}
          alt="Team 2"
          className="w-11 h-11 rounded-full object-contain object-center"
        />
        <p className="text-xs font-semibold truncate max-w-[70px]">
          {data.awayTeam.name}
        </p>
      </div>
    </div>
  );
};

export default MatchItem;
