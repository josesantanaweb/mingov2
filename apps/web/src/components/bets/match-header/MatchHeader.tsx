'use client';
import React, { useState } from 'react';

import MatchCard from '@/components/bets/match-card';
import TotalBox from '@/components/bets/total-box';
import FavoriteButton from '@/components/bets/favorite-button';
import LikeButton from '@/components/bets/like-button/LikeButton';
import { IMatch } from '@/types/match';
import { useLike } from '@/hooks/matches/useLike';

interface MatchHeaderProps {
  match: IMatch;
  betSummary: {
    amount: number;
    label: string;
  };
}

const MatchHeader = ({
  match,
  betSummary,
}: MatchHeaderProps): React.ReactElement => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { isLiked, count, toggleLike } = useLike(0);
  const { label, amount } = betSummary;
  return (
    <div className="flex justify-center items-center flex-col gap-3 w-full">
      <MatchCard match={match} fullWidth />
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <LikeButton isLiked={isLiked} count={count} onToggle={toggleLike} />
          {/* <div className="flex items-center gap-1 text-white">
            <span className="icon-chat text-base"></span>
            <p className="text-base font-medium">11</p>
          </div> */}
        </div>
        <FavoriteButton isFavorite={isFavorite} setIsfavorite={setIsFavorite} />
      </div>
      <TotalBox amount={amount} label={label} />
      <span className="bg-base-700 h-[1px] w-full mt-3 mb-1"></span>
    </div>
  );
};

export default MatchHeader;
