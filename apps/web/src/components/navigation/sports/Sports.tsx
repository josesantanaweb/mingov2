'use client';
import React from 'react';
import SportButton from './SportButton';
import { sports } from '@/data/sports.json';

const Sports = (): React.ReactElement => {
  return (
    <div className="items-center justify-between flex w-full overflow-auto scrollbar-transparent">
      <div className="flex items-center gap-3">
        {sports.map(sport => (
          <SportButton key={sport.name} icon={sport.icon} name={sport.name} />
        ))}
      </div>
    </div>
  );
};

export default Sports;
