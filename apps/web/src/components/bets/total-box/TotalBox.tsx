'use client';
import React from 'react';

interface TotalBoxProps {
  amount: number;
}

const TotalBox = ({ amount = 0.00 }: TotalBoxProps): React.ReactElement => {
  return (
    <div className="flex items-center gap-3 bg-base-800 rounded-xl p-3 w-full">
      <div className="flex items-center gap-1">
        <span className="icon-coin text-lg text-white"></span>
        <p className="text-white text-sm font-medium">
          Total apostado en este partido:
        </p>
      </div>
      <p className="text-orange-500 text-sm font-semibold">{amount.toFixed(2)} VES</p>
    </div>
  );
};

export default TotalBox;
