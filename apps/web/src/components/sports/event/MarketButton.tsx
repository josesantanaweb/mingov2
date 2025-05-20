'use client';
import { IMarketOption } from '@/types/market';
import React from 'react';

interface MarketButtonProps {
  values: IMarketOption;
  onClick?: () => void;
  isSelected: boolean;
}

const MarketButton = ({
  values,
  onClick,
  isSelected = false,
}: MarketButtonProps): React.ReactElement => {
  const { label, odd } = values;
  return (
    <button
      onClick={onClick}
      className={`hover:bg-base-400 cursor-pointer transition-all w-full h-10 rounded-lg flex items-center justify-between py-2 px-3 ${
        isSelected ? 'bg-violet-500' : 'bg-base-500'
      }`}
      aria-pressed={isSelected}
      role="button"
      type="button"
    >
      <span className="text-white text-sm">{label}</span>
      <span className="text-white text-sm font-medium">{odd}</span>
    </button>
  );
};

export default React.memo(MarketButton);
