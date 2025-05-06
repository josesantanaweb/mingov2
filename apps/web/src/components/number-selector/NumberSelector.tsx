'use client';
import type { FC } from 'react';
import React from 'react';

import Number from '@/components/number';

const NumberSelector: FC<{
  handleNumber: (number: number) => void;
}> = ({ handleNumber }) => (
  <div className="flex flex-col">
    <h5 className="mb-2 text-xs font-semibold text-base-300">
      Selecciona el numero de cartones
    </h5>
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <Number
          key={index}
          onClick={() => handleNumber(index + 1)}
          number={index + 1}
        />
      ))}
    </div>
  </div>
);

export default NumberSelector;
