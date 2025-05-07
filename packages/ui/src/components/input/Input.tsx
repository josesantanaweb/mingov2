'use client';
import React from 'react';
import { forwardRef } from 'react';

interface InputProps {
  id?: string;
  className?: string;
  error?: string;
  placeholder: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  type?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, error, icon, iconPosition = 'right', ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && iconPosition === 'left' && (
          <span className="absolute left-3 top-[21px] transform -translate-y-1/2 text-base">
            {icon}
          </span>
        )}

        <input
          id={id}
          ref={ref}
          className={`h-11 w-full text-sm text-base-300 border-base-400 rounded-lg bg-base-500 border bg-transparent px-4 outline-none placeholder-base-300 ${
            icon ? (iconPosition === 'right' ? 'pr-10' : 'pl-10') : ''
          }`}
          {...props}
        />

        {icon && iconPosition === 'right' && (
          <span className="absolute right-3 transform top-[21px] -translate-y-1/2 text-base">
            {icon}
          </span>
        )}

        {error && <span className="text-xs text-red-500 px-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
