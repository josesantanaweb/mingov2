'use client';
import type { ReactElement } from 'react';
import React from 'react';

interface AmountBoxProps {
  amount: number;
}

const AmountBox = ({ amount }: AmountBoxProps): ReactElement => {
  return (
    <div className="flex items-center w-full gap-2 p-1 mb-2 border-2 h-12 rounded-lg border-base-500 px-2">
      <span className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full bg-base-500">
        M
      </span>
      <p className="text-sm font-semibold text-white">{amount} MGO</p>
    </div>
  );
};

export default AmountBox;
