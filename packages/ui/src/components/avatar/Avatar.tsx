'use client';
import React from 'react';

import { cn } from '../../utils/cn';

interface AvatarProps {
  src: string;
  size?: number;
  className?: string;
}

const Avatar = ({ src, size, className }: AvatarProps): React.ReactElement => {
  const imageSize = size || 100;
  const defaultclass = 'rounded-full';
  const customClass = cn(defaultclass, className);
  const validSrc =
    src && src.startsWith('http') ? src : '/users/default-image.png';
  return (
    <img
      src={validSrc}
      alt="user"
      className={customClass}
      width={imageSize}
      height={imageSize}
    />
  );
};

export default Avatar;
