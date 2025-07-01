'use client';
import React from 'react';

import { IMarket } from '@/types/market';

interface MatchItemProps {
  market: IMarket;
}

const MatchItem = ({ market }: MatchItemProps): React.ReactElement => {

  return (
    <div
      className="bg-base-800 px-2 hover:bg-base-700 transition-all w-full text-white rounded-xl h-[75px] gap-3 flex items-center justify-start cursor-pointer"
    >
      <span className={`icon-${market.icon} text-3xl`} />
      <div className="flex items-start gap-1 flex-col">
        <p className="text-sm font-semibold">{market.name}</p>
        <p className="text-xs font-medium text-base-300">
          {market.description}
        </p>
      </div>
    </div>
  );
};

export default MatchItem;
