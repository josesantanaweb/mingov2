'use client';
import React from 'react';
import { Avatar } from '@mingo/ui';

const AVATARS = [
  '/images/users/03.png',
  '/images/users/05.png',
  '/images/users/04.png',
];

const MarketPlayers = (): React.ReactElement => {
  return (
    <div className="flex flex-col gap-2">
      <h6 className="text-white text-base font-medium">Jugadores</h6>
      <div className="flex items-center">
        {AVATARS.map((src, index) => (
          <Avatar key={index} src={src} size={40} isLoading={false} className={index > 0 ? '-ml-6' : ''} />
        ))}
      </div>
    </div>
  );
};

export default MarketPlayers;
