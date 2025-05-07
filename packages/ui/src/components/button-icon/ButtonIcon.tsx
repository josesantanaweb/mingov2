'use client';
import React from 'react';
import type { ReactElement } from 'react';

import Button from '../button';
import { cn } from '../../utils/cn';

interface ButtonIconProps {
  onClick: () => void;
  children: ReactElement;
  className?: string;
}

const ButtonIcon = ({
  onClick,
  children,
  className,
}: ButtonIconProps): ReactElement => {
  const customClass = cn(
    'bg-base-500 w-10 h-10 text-base-300 hover:text-white p-0',
    className,
  );
  return (
    <Button onClick={onClick} className={customClass}>
      {children}
    </Button>
  );
};

export default ButtonIcon;
