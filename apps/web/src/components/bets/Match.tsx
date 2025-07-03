'use client';
import React from 'react';
import { useParams } from 'next/navigation';

import MarketItem from '@/components/bets/market-item';
import MatchWrapper from '@/components/bets/match-wrapper';
import { useMarkets } from '@/hooks/markets/useMarkets';

const Match = (): React.ReactElement => {
  const { matchId } = useParams<{ matchId: string }>();
  const { data: markets, loading, error } = useMarkets(matchId);
  
  return (
    <MatchWrapper>
      {markets?.length === 0 && (
        <div className="flex items-center w-full justify-center">
          <p className="text-base font-medium text-white">
            No hay mercados disponibles para este partido.
          </p>
        </div>
      )}
      {markets?.length > 0 && (
        <div className="flex items-center w-full">
          <p className="text-base font-medium text-white">
            Selecciona un mercado
          </p>
        </div>
      )}
      <div className="flex flex-col gap-3 w-full pb-[50px]">
        {markets?.map(market => (
          <MarketItem
            key={market.id}
            market={market}
            matchId={matchId}
          />
        ))}
      </div>
    </MatchWrapper>
  );
};

export default Match;
