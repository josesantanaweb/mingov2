'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import { IEvent } from '@/types/event';
import { IMarketSelected } from '@/types/market';
import Market from './Market';

interface EventProps {
  isOpen: boolean;
  handleToggle: () => void;
  data: IEvent;
}

const Event = ({
  isOpen,
  handleToggle,
  data,
}: EventProps): React.ReactElement => {
  const [selectedMarket, setSelectedMarket] = useState<IMarketSelected | null>(
    null,
  );

  return (
    <div
      className={`flex w-full bg-base-600 p-3 flex-col relative ${isOpen ? 'rounded-t-xl' : 'rounded-xl'}`}
      role="article"
      aria-expanded={isOpen}
    >
      <div className="flex flex-col gap-3">
        <p className="text-base-300 text-sm">{data.league}</p>
        <p className="text-base-300 text-sm">{data.date}</p>

        {[data.homeTeam, data.awayTeam].map((team, index) => (
          <div key={index} className="flex items-center gap-2 last:mb-3">
            <Image
              src={team.logo}
              alt={`${team.name} logo`}
              className="w-5 h-5"
              width={20}
              height={20}
            />
            <p className="text-white text-sm">{team.name}</p>
          </div>
        ))}
      </div>

      {data.markets.length > 0 && (
        <Market
          market={data.markets[0]}
          handleToggle={handleToggle}
          setSelectedMarket={setSelectedMarket}
          selectedMarket={selectedMarket}
          isOpen={isOpen}
        />
      )}

      <div
        className={clsx(
          'absolute top-full left-0 overflow-hidden rounded-b-xl transition-all w-full bg-base-600 p-3',
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="max-h-[150px] overflow-y-auto scrollbar flex flex-col gap-3 pr-2">
          {data.markets.slice(1).map((market, index) => (
            <Market
              market={market}
              key={market.name + index}
              setSelectedMarket={setSelectedMarket}
              selectedMarket={selectedMarket}
              isOpen={isOpen}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Event);
