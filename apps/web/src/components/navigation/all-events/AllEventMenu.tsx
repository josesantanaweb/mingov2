'use client';
import React from 'react';
import clsx from 'clsx';
import EventItem from './EventItem';
import { ILeague } from './types';

interface AllEventMenuProps {
  isOpen: boolean;
  leagues: ILeague[];
}

const AllEventMenu = ({
  isOpen,
  leagues,
}: AllEventMenuProps): React.ReactElement => {
  return (
    <div
      className={clsx(
        'flex flex-col gap-5 pl-8 transition-all',
        isOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 py-0',
      )}
    >
      {leagues.map(league => (
        <EventItem league={league} />
      ))}
    </div>
  );
};

export default AllEventMenu;
