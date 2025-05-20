'use client';
import React, { useState } from 'react';
import LeagueButton from './LeagueButton';
import { ILeague } from '@/types/league';
import { leagues } from '@/data/leagues.json';

const Leagues = (): React.ReactElement => {
  const [selectedLeague, setSelectedLeague] = useState<string>('Popular');

  const handleLeague = (leagueName: string) => setSelectedLeague(leagueName);
  return (
    <div className="mb-5 max-w-full">
      <div className="flex gap-3 items-center w-full">
        <LeagueButton
          name="Popular"
          isSelected={selectedLeague === 'Popular'}
          onClick={() => handleLeague('Popular')}
        />
        {leagues.map((league: ILeague) => (
          <LeagueButton
            key={league.id}
            name={league.name}
            logo={league.logo}
            isSelected={selectedLeague === league.name}
            onClick={() => handleLeague(league.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default Leagues;
