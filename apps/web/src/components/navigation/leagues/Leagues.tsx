'use client';
import React, { useState } from 'react';
import LeagueButton from './LeagueButton';
import { ILeague } from '@/types/league';
import { leagues } from '@/data/leagues.json';

const Leagues = (): React.ReactElement => {
  const [selectedLeague, setSelectedLeague] = useState<string>('Popular');

  const handleLeague = (leagueName: string) => setSelectedLeague(leagueName);
  return (
    <div
      className="max-w-full flex overflow-auto gap-3 items-center"
      style={{
        scrollbarColor: 'transparent transparent',
        scrollbarWidth: 'thin',
      }}
    >
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
  );
};

export default Leagues;
