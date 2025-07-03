'use client';
import React from 'react';
import { IMarketOption } from '@/types/market';

interface MarketOption {
  option: IMarketOption;
  isActive?: boolean;
  onClick?: (option: IMarketOption) => void;
}

const MarketOption = ({
  option,
  isActive,
  onClick,
}: MarketOption): React.ReactElement => {
  return (
    <div
      className={`flex items-center justify-center flex-col w-full h-[90px] cursor-pointer ${isActive ? 'bg-primary-600' : 'bg-base-700'} text-white rounded-xl`}
      onClick={() => onClick && onClick(option)}
    >
      <p
        className={`text-sm capitalize ${isActive ? 'text-white' : 'text-base-300'}`}
      >
        {option.name}
      </p>
      <h6 className="text-2xl font-semibold">{option.odds}</h6>
    </div>
  );
};

export default MarketOption;
