'use client';
import React from 'react';

import MatchCard from '@/components/bets/match-card';
import TotalBox from '@/components/bets/total-box';
import { IMatch } from '@/types/match';

interface MatchHeaderProps {
  match: IMatch;
}

const MatchHeader = ({ match }: MatchHeaderProps): React.ReactElement => {
  return (
    <div className="flex justify-center items-center flex-col gap-3 w-full">
      <MatchCard match={match} fullWidth />
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-red-600">
            <span className="icon-heart text-xl"></span>
            <p className="text-base font-medium">10</p>
          </div>
          <div className="flex items-center gap-1 text-white">
            <span className="icon-chat text-base"></span>
            <p className="text-base font-medium">11</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-orange-400">
          <span className="icon-star text-xl"></span>
          <p className="text-base font-medium">Quitar de favoritos</p>
        </div>
      </div>
      <TotalBox amount={300} />
      <span className="bg-base-700 h-[1px] w-full mt-3 mb-1"></span>
    </div>
  );
};

export default MatchHeader;
