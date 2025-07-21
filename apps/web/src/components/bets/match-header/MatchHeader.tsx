'use client';
import React, { useState } from 'react';
import MatchCard from '@/components/bets/match-card';
import TotalBox from '@/components/bets/total-box';
import FavoriteButton from '@/components/bets/favorite-button';
import LikeButton from '@/components/bets/like-button';
import CommentButton from '@/components/bets/comment-button';
import { IMatch } from '@/types/match';
import { useLike } from '@/hooks/matches/useLike';
import Comments from '../modals/comments';

interface MatchHeaderProps {
  match: IMatch;
  betSummary: {
    amount: number;
    label: string;
  };
  pageType: 'MATCH' | 'MARKET';
}

const MatchHeader = ({
  match,
  betSummary,
  pageType,
}: MatchHeaderProps): React.ReactElement => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { isLiked, count, toggleLike } = useLike(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { label, amount } = betSummary;

  const handleOpenModal = () => setIsOpen(true);

  const handleCloseModal = () => setIsOpen(false);

  return (
    <div className="flex justify-center items-center flex-col gap-3 w-full">
      <MatchCard match={match} fullWidth />
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          {pageType === 'MATCH' && (
            <LikeButton isLiked={isLiked} count={count} onClick={toggleLike} />
          )}
          {pageType === 'MARKET' && (
            <CommentButton onClick={handleOpenModal} commentsCount={10} />
          )}
        </div>
        {pageType === 'MATCH' && (
          <FavoriteButton
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
          />
        )}
      </div>
      <TotalBox amount={amount} label={label} />
      <span className="bg-base-700 h-[1px] w-full mt-3 mb-1"></span>
      <Comments isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default MatchHeader;
