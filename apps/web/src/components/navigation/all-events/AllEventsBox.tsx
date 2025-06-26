import React from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import EventItem from './EventItem';
import AllEventMenu from './AllEventMenu';
import { ILeague } from './types';

interface AllEventsBoxProps {
  openIndex: string | null;
  setOpenIndex: (index: string | null) => void;
  events: {
    name: string;
    count: number;
    leagues: ILeague[];
  }[];
}

const AllEventsBox = ({
  openIndex,
  setOpenIndex,
  events,
}: AllEventsBoxProps): React.ReactElement => {
  return (
    <div className="flex flex-col gap-5 w-[350px] bg-base-500 p-5 absolute top-[110%] left-0 z-10 rounded-xl">
      {events.map(event => {
        const isOpen = openIndex === event.name;
        return (
          <div className="relative" key={event.name}>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setOpenIndex(isOpen ? null : event.name)}
            >
              <EventItem league={event} isEvent />
              <FontAwesomeIcon
                icon={faChevronDown}
                fontSize={12}
                width={12}
                className={clsx(
                  'text-white transition-all',
                  isOpen ? 'rotate-180' : 'rotate-0',
                )}
              />
            </div>
            <AllEventMenu isOpen={isOpen} leagues={event.leagues} />
          </div>
        );
      })}
    </div>
  );
};

export default AllEventsBox;
