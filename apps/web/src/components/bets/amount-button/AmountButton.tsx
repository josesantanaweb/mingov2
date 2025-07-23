'use client';
import React from 'react';
import { cn } from '@/utils/cn';

interface AmountButtonProps {
  amount: number;
  isSelected?: boolean;
  onClick: (amount: number) => void;
  variant?: 'modal' | 'default';
}

const AmountButton = ({
  amount,
  isSelected,
  onClick,
  variant = 'default',
}: AmountButtonProps): React.ReactElement => {
  const baseClass = 'flex items-center justify-center rounded-lg h-12 text-base-300 cursor-pointer transition-all font-semibold';
  const variantClass = variant === 'modal'
    ? 'bg-base-700'
    : 'bg-base-800 hover:bg-base-700';
  const selectedClass = isSelected ? 'bg-base-700 text-white' : '';

  const buttonClass = cn(baseClass, variantClass, selectedClass);

  return (
    <button className={buttonClass} onClick={() => onClick(amount)}>
      {amount}
    </button>
  );
};

export default AmountButton;
