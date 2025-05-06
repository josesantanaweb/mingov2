'use client';
import type { ReactElement } from 'react';
import React, { memo } from 'react';

interface LetterProps {
  letter: string;
}

const Letter = memo(({ letter }: LetterProps): ReactElement => {
  return (
    <span className="text-white text-lg font-bold flex justify-center items-center rounded-2xl w-full">
      {letter}
    </span>
  );
});

Letter.displayName = 'Letter';

export default Letter;
