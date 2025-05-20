'use client';
import type { ReactElement } from 'react';
import React from 'react';

import { MAX_BALLS } from '@/constants';

import Ball from '../ball';

interface BallsProps {
  balls: { number: number; id: number; letter: string }[];
  lastBallId: number | null;
}

const Balls = ({ balls, lastBallId }: BallsProps): ReactElement => {
  return (
    <div className="flex justify-center items-center max-w-[310px] gap-3 relative w-full">
      {balls.slice(-MAX_BALLS).map(ball => {
        return (
          <Ball key={ball.id} ball={ball} isLast={ball.id === lastBallId} />
        );
      })}
    </div>
  );
};

export default Balls;
