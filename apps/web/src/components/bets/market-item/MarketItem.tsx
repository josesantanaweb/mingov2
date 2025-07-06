'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import { IMarket } from '@/types/market';
import { MARKET_ROUTE } from '@/constants';

interface MarketItemProps {
  market: IMarket;
  matchId?: string;
  asNavigate?: boolean;
}

const MarketItem = ({
  market,
  matchId,
  asNavigate = true,
}: MarketItemProps): React.ReactElement => {
  const router = useRouter();

  const handleNavigate = () =>
    asNavigate && router.push(MARKET_ROUTE(matchId, market.id));

  return (
    <button
      onClick={handleNavigate}
      className={`px-2 transition-all w-full text-white rounded-xl h-[75px] gap-3 flex items-center justify-start cursor-pointer ${asNavigate ? 'bg-base-800' : 'bg-base-700'}`}
    >
      <span className={`icon-${market.marketType.icon} text-3xl`} />
      <div className="flex items-start gap-1 flex-col">
        <p className="text-sm font-semibold">{market.marketType.name}</p>
        <p className="text-xs font-medium text-base-300">
          {market.marketType.description}
        </p>
      </div>
    </button>
  );
};

export default MarketItem;
