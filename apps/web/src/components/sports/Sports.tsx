'use client';
import React, { useState } from 'react';
import SportsNav from '@/components/navigation/sports';
import LeaguesNav from '@/components/navigation/leagues';
import Event from '@/components/sports/event';

import { events } from '@/data/events.json';

const Sports = (): React.ReactElement => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col w-full h-full">
      <SportsNav />
      <div className="flex flex-col p-4">
        <div className="flex items-center gap-3 mb-3">
          <h5 className="text-xl text-white">Futbol</h5>
        </div>
        <LeaguesNav />
        <div className="flex items-center gap-3 mb-5">
          <h5 className="text-xl text-white">Popular</h5>
        </div>
        <div className="grid grid-cols-2 gap-5 w-full items-start">
          {events.map((eventData, index) => (
            <Event
              key={index}
              isOpen={openIndex === index}
              handleToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              data={eventData}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sports;
