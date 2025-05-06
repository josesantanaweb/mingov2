'use client';
import React from 'react';

import { cn } from '@/utils/cn';
import Avatar from '@/components/avatar';
import type { User as UserType } from '@/__generated__/graphql';
import { getRankingColor } from '@/utils/getRankingColor';

interface UserProps {
  user: UserType;
  isWon?: boolean;
}

const User = ({ user, isWon }: UserProps): React.ReactElement => {
  const { username, image, raking } = user;
  const tier = getRankingColor(raking);

  const borderClass = cn(
    'border-[3px]',
    isWon && 'border-violet-500',
    !isWon && {
      'border-yellow-500': tier === 'gold',
      'border-gray-400': tier === 'silver',
      'border-orange-700': tier === 'bronze',
      'border-base-500': tier === 'low',
    }
  );

  const backgroundClass = cn(
    isWon && 'bg-violet-500',
    !isWon && {
      'bg-yellow-500': tier === 'gold',
      'bg-gray-400': tier === 'silver',
      'bg-orange-700': tier === 'bronze',
      'bg-base-500': tier === 'low',
    }
  );

  return (
    <div
      data-testid="user"
      className={`w-[60px] h-[60px] rounded-full bg-white relative ${borderClass}`}
    >
      <span
        className={`absolute -top-2 left-1/2 -translate-x-1/2 text-white text-[10px] capitalize w-5 h-5 rounded-md flex items-center justify-center polygon ${backgroundClass}`}
      >
        {raking}
      </span>
      <Avatar src={image || '/users/default-image.png'} />
      <span
        className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-white text-[10px] capitalize px-2 h-4 rounded flex items-center ${backgroundClass}`}
      >
        {username}
      </span>
      {isWon && (
        <span className="bg-violet-500 absolute -left-20 top-[50%] -translate-y-1/2 text-xs h-5 px-2 text-white rounded flex items-center">
          Bingo
        </span>
      )}
    </div>
  );
};

export default User;
