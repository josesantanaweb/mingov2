'use client';
import React from 'react';
import { sports } from '@/data/sports.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MENU } from './menu';

import SportButton from './SportButton';

const Sports = (): React.ReactElement => {
  return (
    <div className="w-full flex items-center justify-between p-3 bg-base-600">
      <div className="flex items-center gap-3">
        {MENU.map(sport => (
          <SportButton key={sport.name} icon={sport.icon} name={sport.name} />
        ))}
        <span className="bg-base-400 w-[1px] h-8"></span>
        {sports.map(sport => (
          <SportButton key={sport.name} icon={sport.icon} name={sport.name} />
        ))}
      </div>
      <button className="text-base-300 hover:text-violet-500 cursor-pointer transition-all px-3">
        <FontAwesomeIcon icon={faSearch} fontSize={22} width={22} />
      </button>
    </div>
  );
};

export default Sports;
