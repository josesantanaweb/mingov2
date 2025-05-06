'use client';
import React from 'react';

interface RemainingCountProps {
  remainingCount: number;
}

const RemainingCount = ({
  remainingCount,
}: RemainingCountProps): React.ReactElement => {
  return (
    <div className="flex bg-base-400 rounded-full w-[60px] h-[60px] text-white text-lg justify-center items-center">
      +{remainingCount}
    </div>
  );
};

export default RemainingCount;
