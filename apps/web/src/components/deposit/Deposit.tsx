'use client';
import React from 'react';
import type { ReactElement } from 'react';

import Button from '../button';

interface DepositProps {
  amount: number;
  isLoading?: boolean;
}

const Deposit = ({ amount, isLoading }: DepositProps): ReactElement => {
  if (isLoading) {
    return (
      <div className="rounded-lg border-2 w-[260px] h-[40px] border-base-500 flex items-center justify-between p-1 animate-pulse">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 bg-base-500 rounded-full" />
          <div className="w-16 h-4 bg-base-500 rounded" />
        </div>
        <div className="w-[90px] h-full bg-base-500 rounded" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border-2 w-[260px] h-[40px] border-base-500 flex items-center justify-between p-1">
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 bg-base-500 rounded-full font-semibold text-sm text-white flex justify-center items-center">
          M
        </span>
        <h4 className="text-white uppercase text-base font-semibold">
          {amount || 0} MGO
        </h4>
      </div>
      <Button className="w-[90px] h-full bg-base-500 text-base-300 hover:text-white text-xs">
        Depositar
      </Button>
    </div>
  );
};

export default Deposit;
