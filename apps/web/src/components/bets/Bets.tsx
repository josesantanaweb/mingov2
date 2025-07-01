'use client';
import React from 'react';
import Sports from '@/components/navigation/sports';
import Leagues from '@/components/navigation/leagues';
import MainBanner from '@/components/main-banner';
import MatchCard from '@/components/bets/match-card';
import MatchItem from '@/components/bets/match-item';
import { matches } from '@/data/matches.json';

const Bets = (): React.ReactElement => {
  return (
    <section className="bets relative px-3 py-4">
      <div className="flex flex-col gap-3 mb-6">
        <MainBanner />
        <Sports />
        <Leagues />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h6 className="text-base font-medium text-white">En vivo</h6>
            <button className="text-sm font-medium text-base-300">
              Ver todos
            </button>
          </div>
          <div className="scrollbar-transparent flex items-center gap-4 max-w-full overflow-x-auto">
            {matches.map((match, index) => (
              <MatchCard key={index} match={match} isActive={index === 0} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h6 className="text-base font-medium text-white">Próximo</h6>
            <button className="text-sm font-medium text-base-300">
              Ver todos
            </button>
          </div>
          <div className="scrollbar-transparent max-h-[300px] overflow-y-auto pb-[80px]">
            <div className="flex flex-col gap-3">
              {matches.map((match, index) => (
                <MatchItem key={index} match={match} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bets;
