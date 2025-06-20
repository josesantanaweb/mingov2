'use client';
import React from 'react';
import type { ReactElement } from 'react';

const Skeleton = (): ReactElement => {
  return (
    <div className="flex items-center justify-center gap-2 cursor-pointer w-1/4 animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-20 rounded-lg bg-base-500" />
          <span className="w-6 h-20 rounded-lg bg-base-500" />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-20 rounded-lg bg-base-500" />
          <span className="w-6 h-20 rounded-lg bg-base-500" />
        </div>
      </div>
      <div className="w-[210px] h-[250px] relative rounded-2xl p-0.5">
        <div className="w-full h-full bg-base-500 rounded-2xl" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="w-6 h-20 rounded-lg bg-base-500" />
          <span className="w-2 h-20 rounded-lg bg-base-500" />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-20 rounded-lg bg-base-500" />
          <span className="w-2 h-20 rounded-lg bg-base-500" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
