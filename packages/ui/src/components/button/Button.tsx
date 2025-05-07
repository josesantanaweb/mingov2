'use client';
import type { ReactElement } from 'react';
import React from 'react';

import { cn } from '../../utils/cn';

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button = ({
  type = 'button',
  onClick,
  children,
  className,
  disabled,
}: ButtonProps): ReactElement => {
  const disabledClass = 'opacity-50 cursor-not-allowed';
  const defaultVariant = `bg-violet-500 text-white ${disabled ? '' : 'hover:bg-violet-600'}`;
  const defaultclass =
    'text-sm rounded-lg h-11 w-full font-medium transition-all flex gap-2 items-center justify-center flex uppercase px-5 whitespace-nowrap';
  const customClass = cn(defaultclass, defaultVariant, className);

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${customClass} ${disabled && disabledClass}`}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
