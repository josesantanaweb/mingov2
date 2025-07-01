'use client';
import React from 'react';

import MatchCard from '@/components/bets/match-card';
import TotalBox from '@/components/bets/total-box';
import MatchItem from '@/components/bets/market-item';
import { matches } from '@/data/matches.json';
import { markets } from '@/data/markets.json';

const Match = (): React.ReactElement => {
  return (
    <section className="bets relative px-3 py-4">
      <div className="flex flex-col gap-3 mb-6 justify-center items-center">
        <MatchCard match={matches[0]} fullWidth />
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-red-600">
              <span className="icon-heart text-lg"></span>
              <p className="text-base font-medium">10</p>
            </div>
            <div className="flex items-center gap-1 text-white">
              <span className="icon-heart text-lg"></span>
              <p className="text-base font-medium">11</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-orange-400">
            <span className="icon-star text-lg"></span>
            <p className="text-base font-medium">Quitar de favoritos</p>
          </div>
        </div>
        <TotalBox amount={300} />
        <span className="bg-base-700 h-[1px] w-full my-3"></span>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center justify-between">
            <h6 className="text-base font-medium text-white">
              Selecciona un mercado
            </h6>
          </div>
          <div className="flex flex-col gap-3 w-full">
            {markets.map(market => (
              <MatchItem key={market.id} market={market} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Match;
