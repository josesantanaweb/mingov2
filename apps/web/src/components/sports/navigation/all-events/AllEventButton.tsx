'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface AllEventButtonProps {
  onClick: () => void;
  count: number;
}

const AllEventButton = ({
  onClick,
  count,
}: AllEventButtonProps): React.ReactElement => {
  return (
    <button
      onClick={onClick}
      className="flex gap-4 items-center transition-all text-white rounded-full px-4 h-[40px] flex-shrink-0 cursor-pointer bg-base-500 hover:bg-base-400"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold uppercase">Todos</span>
        <span className="text-base text-base-300 font-semibold">{count}</span>
      </div>
      <FontAwesomeIcon icon={faChevronDown} fontSize={12} width={12} />
    </button>
  );
};

export default AllEventButton;
