'use client';
import React from 'react';
import clsx from 'clsx';
import type { ReactElement } from 'react';

interface Ball {
  number: number;
  id: number;
  letter: string;
}

interface BallProps {
  ball: Ball;
  isLast?: boolean;
}

const Ball = ({ ball, isLast }: BallProps): ReactElement => {
  return (
    <div
      key={ball.id}
      data-testid="ball"
      className={clsx(
        'ball w-12 h-12 text-white rounded-full flex items-center flex-col justify-center p-2',
        {
          'bg-violet-500 border-white': isLast,
          'bg-base-500 border-base-300': !isLast,
        },
        'border-2  animate-ball relative'
      )}
    >
      <span className="text-xs font-bold">{ball.letter}</span>
      <span className="text-xl rounded-full flex items-center justify-center font-bold h-5">
        {ball.number}
      </span>
    </div>
  );
};

export default Ball;
