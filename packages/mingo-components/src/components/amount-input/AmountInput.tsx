'use client';
import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';

interface AmountInputProps {
  value: number;
  onChange?: (value: number) => void;
  onMaxClick?: () => void;
  placeholder?: string;
  maxValue?: number;
  disabled?: boolean;
  className?: string;
  variant?: 'modal' | 'default';
}

const AmountInput = ({
  value = 0,
  onChange,
  onMaxClick,
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

  const handleMaxClick = () => {
    if (maxValue) {
      setInputValue(maxValue.toString());
      onChange?.(maxValue);
    }
    onMaxClick?.();
  };

  const inputClass = cn(
    'w-full rounded-lg h-12 px-4 text-base-300 text-base border border-base-600 bg-transparent placeholder:text-base-300 focus:outline-none focus:border-primary-500 transition-colors',
    disabled && 'opacity-80 cursor-not-allowed',
    className,
  );

  const variantButtonClass =
    variant === 'modal'
      ? 'bg-base-700 hover:bg-base-600'
      : 'bg-base-800 hover:bg-base-700';

  const disabledButtonClass = disabled && 'opacity-50 cursor-not-allowed';

  const defaultButtonClass = cn(
    'absolute right-[4px] top-[4px] text-sm px-4 text-white font-medium h-[40px] rounded-lg cursor-pointer transition-colors',
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
      <button
        type="button"
        className={maxButtonClass}
        onClick={handleMaxClick}
        disabled={disabled || !maxValue}
      >
        Max
      </button>
    </div>
  );
};

export default AmountInput;
