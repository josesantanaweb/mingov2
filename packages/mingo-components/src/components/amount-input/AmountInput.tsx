'use client';
import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';

export const MIN_BET_AMOUNT = 1;

interface AmountInputProps {
  value: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  maxValue?: number;
  disabled?: boolean;
  className?: string;
  variant?: 'modal' | 'default';
}

const AmountInput = ({
  value = 0,
  onChange,
  placeholder = '0',
  maxValue,
  disabled = false,
  className,
  variant = 'default',
}: AmountInputProps): React.ReactElement => {
  const [inputValue, setInputValue] = useState<string>(value?.toString());

  useEffect(() => {
    setInputValue(value?.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const numericValue = parseFloat(newValue) || 0;
    onChange?.(numericValue);
  };

  const handleMinClick = () => {
    setInputValue(MIN_BET_AMOUNT.toString());
    onChange?.(MIN_BET_AMOUNT);
  };

  const handleHalfClick = () => {
    const current = parseFloat(inputValue) || 0;
    const half = Math.max(MIN_BET_AMOUNT, Math.floor(current / 2));
    setInputValue(half.toString());
    onChange?.(half);
  };

  const handleDoubleClick = () => {
    const current = parseFloat(inputValue) || 0;
    const double = maxValue ? Math.min(maxValue, current * 2) : current * 2;
    setInputValue(double.toString());
    onChange?.(double);
  };

  const inputClass = cn(
    'w-full rounded-lg h-[50px] px-4 text-base-300 text-base border border-base-600 bg-transparent placeholder:text-base-300 focus:outline-none focus:border-primary-500 transition-colors',
    disabled && 'opacity-80 cursor-not-allowed',
    className,
  );

  const variantButtonClass =
    variant === 'modal'
      ? 'bg-base-700 hover:bg-base-600'
      : 'bg-base-800 hover:bg-base-700';

  const disabledButtonClass = disabled && 'opacity-50 cursor-not-allowed';

  const defaultButtonClass = cn(
    'text-sm px-4 text-white font-medium h-[42px] rounded-lg cursor-pointer transition-colors',
  );

  const maxButtonClass = cn(
    defaultButtonClass,
    variantButtonClass,
    disabledButtonClass,
  );

  return (
    <div className="relative">
      <input
        data-testid="input-amount"
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        className={inputClass}
        placeholder={placeholder}
        disabled={disabled}
        min="0"
        step="0.01"
      />
      <div className="flex items-center gap-1 absolute right-[4px] top-[4px]">
        <button
          type="button"
          className={maxButtonClass}
          onClick={handleMinClick}
          disabled={disabled}
        >
          Min
        </button>
        <button
          type="button"
          className={maxButtonClass}
          onClick={handleHalfClick}
          disabled={disabled || !maxValue}
        >
          1/2
        </button>
        <button
          type="button"
          className={maxButtonClass}
          onClick={handleDoubleClick}
          disabled={disabled || !maxValue}
        >
          X2
        </button>
      </div>
    </div>
  );
};

export default AmountInput;
