'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LeagueLogo from './LeagueLogo';
import { IMatch } from '@/types/match';
import { MATCH_ROUTE } from '@/constants';

interface MatchCardProps {
  match: IMatch;
  isActive?: boolean;
  fullWidth?: boolean;
}

const MatchCard = ({
  match,
  isActive = false,
  fullWidth = false,
}: MatchCardProps): React.ReactElement => {
  const cardClass = isActive
    ? 'bg-gradient-to-r from-primary-600 to-primary-900'
    : 'bg-base-800';
  const widthClass = fullWidth ? 'w-full' : 'w-[291px]';

  return (
    <Link
      href={MATCH_ROUTE(match.id)}
      className={`relative flex-shrink-0 h-[163px] rounded-xl cursor-pointer px-3 ${widthClass} ${cardClass}`}
    >
      <LeagueLogo src="/images/leagues/premier-league.png" />
      <div className="relative z-10 flex flex-col text-white p-3">
        <div className="w-full flex items-center justify-center mb-4">
          <h6 className="text-base font-medium">{match.league}</h6>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 flex-col">
            <Image
              width={50}
              height={50}
              src={match.homeTeam.logo}
              alt="Team 1"
              className="w-12 h-12 rounded-full object-contain object-center"
            />
            <p className="text-xs font-semibold">{match.homeTeam.name}</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="text-3xl font-semibold">3</p>
              <p className="text-3xl font-semibold">:</p>
              <p className="text-3xl font-semibold">0</p>
            </div>
            <p className="text-center text-sm font-medium">2T</p>
          </div>
          <div className="flex items-center gap-2 flex-col">
            <Image
              width={50}
              height={50}
              src={match.awayTeam.logo}
              alt="Team 1"
              className="w-12 h-12 rounded-full object-contain object-center"
            />
            <p className="text-xs font-semibold">{match.awayTeam.name}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MatchCard;
