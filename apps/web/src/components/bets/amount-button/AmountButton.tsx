'use client';
import React from 'react';
import { cn } from '@/utils/cn';

interface AmountButtonProps {
  amount: number;
  isSelected?: boolean;
  onClick: (amount: number) => void;
}

const AmountButton = ({
  amount,
  isSelected,
  onClick,
}: AmountButtonProps): React.ReactElement => {
  const buttonClass = cn(
    'flex items-center justify-center rounded-lg h-11 cursor-pointer transition-all font-medium',
    isSelected
      ? 'bg-primary-600 text-white'
      : 'bg-base-700 text-base-300 hover:bg-base-600',
  );

  return (
    <button className={buttonClass} onClick={() => onClick(amount)}>
      {amount}
    </button>
  );
};

export default AmountButton;
