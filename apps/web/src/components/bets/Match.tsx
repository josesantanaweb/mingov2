'use client';
import React from 'react';
import { useParams } from 'next/navigation';

import MatchItem from '@/components/bets/market-item';
import MatchWrapper from '@/components/bets/match-wrapper';
import { useMarkets } from '@/hooks/markets/useMarkets';

const Match = (): React.ReactElement => {
  const { matchId } = useParams<{ matchId: string }>();
  const { data: markets, loading, error } = useMarkets();
  return (
    <MatchWrapper>
      <div className="flex items-center justify-between">
        <h6 className="text-base font-medium text-white">
          Selecciona un mercado
        </h6>
      </div>
      <div className="flex flex-col gap-3 w-full pb-[50px]">
        {markets.map(market => (
          <MatchItem
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
