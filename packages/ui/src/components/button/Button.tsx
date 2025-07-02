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
  variant?: 'default' | 'primary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'full';
}

const variants = {
  default: 'bg-base-700 text-base-300 text-white hover:bg-base-600',
  primary: 'bg-primary-600 text-white hover:bg-primary-500',
  danger: 'bg-red-600 text-white hover:bg-red-500',
  success: 'bg-green-600 text-white hover:bg-green-500',
};

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
  full: 'w-full h-14 px-5 text-base',
};

const Button = ({
  type = 'button',
  onClick,
  children,
  className,
  disabled,
  variant = 'default',
  size = 'md',
}: ButtonProps): ReactElement => {
  const baseClass =
    'rounded-lg font-medium transition-all flex gap-2 items-center justify-center uppercase whitespace-nowrap';

  const disabledClass = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';

  const customClass = cn(
    baseClass,
    variants[variant],
    sizes[size],
    disabledClass,
    className,
  );

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={customClass}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
