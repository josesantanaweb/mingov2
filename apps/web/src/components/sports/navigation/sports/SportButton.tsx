'use client';
import React from 'react';
import { Tooltip } from 'react-tooltip';

interface SportButtonProps {
  icon: string;
  name?: string;
}

const SportButton = ({ icon, name }: SportButtonProps): React.ReactElement => {
  return (
    <button
      className="cursor-pointer text-base-300 hover:text-violet-500 p-1 transition-all"
      data-tooltip-id={`tooltip-${name}`}
      data-tooltip-content={name}
    >
      <span className={`icon-${icon} text-3xl`}></span>
      <Tooltip
        id={`tooltip-${name}`}
        place="bottom"
        className="!bg-base-500 !rounded-lg text-white px-2 py-1 capitalize"
        offset={20}
        opacity={1}
      />
    </button>
  );
};

export default SportButton;
