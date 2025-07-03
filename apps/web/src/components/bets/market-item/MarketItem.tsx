'use client';
import React from 'react';
import Link from 'next/link';

import { IMarket } from '@/types/market';
import { MARKET_ROUTE } from '@/constants';

interface MarketItemProps {
  market: IMarket;
  matchId: string;
}

const MarketItem = ({ market, matchId }: MarketItemProps): React.ReactElement => {

  return (
    <Link
      href={MARKET_ROUTE(matchId, market.id)}
      className="bg-base-800 px-2 hover:bg-base-700 transition-all w-full text-white rounded-xl h-[75px] gap-3 flex items-center justify-start cursor-pointer"
    >
      <span className={`icon-${market.marketType.icon} text-3xl`} />
      <div className="flex items-start gap-1 flex-col">
        <p className="text-sm font-semibold">{market.marketType.name}</p>
        <p className="text-xs font-medium text-base-300">
          {market.marketType.description}
        </p>
      </div>
    </Link>
  );
};

export default MarketItem;
