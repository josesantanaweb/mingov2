'use client';
import type { FC } from 'react';
import React from 'react';

import AmountBox from '@/components/amount-box';
import Button from '@/components/button';

const TotalAmount: FC<{
  total: number;
  balance: number;
  onBuy: () => void;
}> = ({ total, balance, onBuy }) => (
  <div className="flex flex-col">
    <h5 className="mb-2 text-xs font-semibold text-base-300">Total</h5>
    <AmountBox amount={total} />
    <Button className="uppercase" onClick={onBuy} disabled={balance < total}>
      Comprar
    </Button>
  </div>
);

export default TotalAmount;
