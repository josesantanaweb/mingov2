'use client';
import React, { useState } from 'react';
import AllEventsBox from './AllEventsBox';
import AllEventButton from './AllEventButton';
import { events } from '@/data/events-by-country.json';

const AllEvents = (): React.ReactElement => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleEventsToggle = (): void => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <AllEventButton onClick={handleEventsToggle} count={events.length} />
      {isOpen && (
        <AllEventsBox
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
          events={events}
        />
      )}
    </div>
  );
};

export default AllEvents;
