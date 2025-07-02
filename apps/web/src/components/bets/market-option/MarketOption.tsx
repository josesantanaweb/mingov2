'use client';
import React from 'react';
import { IMarketOption } from '@/types/market';

interface MarketOption {
  option: IMarketOption;
  isActive?: boolean;
}

const MarketOption = ({ option, isActive }: MarketOption): React.ReactElement => {
  return (
    <div className={`flex items-center justify-center flex-col w-1/3 h-[90px] cursor-pointer ${isActive ? 'bg-primary-600' : 'bg-base-700'} text-white rounded-xl`}>
      <p className="text-sm">{option.name}</p>
      <h6 className="text-2xl font-semibold">{option.odds}</h6>
    </div>
  );
};

export default MarketOption;
