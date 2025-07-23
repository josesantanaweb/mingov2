'use client';
import React from 'react';
import { CoinResultEnum } from '@/types/coin-flip';

interface MultiplierLabelProps {
  result: CoinResultEnum | null;
  selectedAmount: number | null;
  multiplier: number;
}

const MultiplierLabel = ({
  result,
  selectedAmount,
  multiplier,
}: MultiplierLabelProps): React.ReactElement => {

  const calculateMultiplier = (): string => {
    if (selectedAmount === null) return '0.00';

    return multiplier.toFixed(2);
  };

  const getMultiplierColor = (): string => {
    switch (result) {
      case CoinResultEnum.WIN:
        return 'text-green-500';
      case CoinResultEnum.LOSE:
        return 'text-red-500';
      default:
        return 'text-base-300';
    }
  };

  const multiplierValue = calculateMultiplier();
  const colorClass = getMultiplierColor();

  return (
    <div className="flex flex-col justify-center items-center gap-1 absolute right-0 top-1/2 -translate-y-1/2">
      <div className="flex items-center gap-1">
        <p className={`text-xl font-bold ${colorClass}`}>
          x{multiplierValue}
        </p>
      </div>

      <p className="text-base-300 text-xs font-medium">
        Multiplicador
      </p>
    </div>
  );
};

export default MultiplierLabel;
