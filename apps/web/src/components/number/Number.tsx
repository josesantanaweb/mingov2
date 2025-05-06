'use client';
import type { ReactElement } from 'react';
import React from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface NumberProps {
  number: number;
  onClick: () => void;
}

const Number = ({ number, onClick }: NumberProps): ReactElement => {
  const renderMark = () => (
    <div className="mark">
      <FontAwesomeIcon
        icon={faStar}
        size="xl"
        className="text-white"
        width={20}
        data-testid="icon-star"
      />
    </div>
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx('number', {
        'bg-transparent': number === -1,
        'bg-base-500 hover:bg-base-400 focus:bg-violet-500 focus:text-white':
          number !== -1,
      })}
    >
      {number === -1 ? renderMark() : number}
    </button>
  );
};

export default Number;
