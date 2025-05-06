'use client';
import type { ReactElement } from 'react';
import React from 'react';

interface AwardProps {
  award: number;
}

const Award = ({ award }: AwardProps): ReactElement => {
  return (
    <div className="flex flex-col">
      <h4 className="text-white text-xs font-semibold uppercase">Premio</h4>
      <h5 className="text-yellow-400 text-2xl font-semibold uppercase">
        {award} MGO
      </h5>
    </div>
  );
};

export default Award;
