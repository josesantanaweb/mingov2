'use client';
import React from 'react';

const GameFooter = (): React.ReactElement => {

  return (
    <div className="flex items-center justify-between border-t border-base-700 bg-base-800 w-full p-3 rounded-b-xl">
      <div className="flex items-center">
        <button className="text-2xl text-base-300">
          <span className="icon-heart" />
        </button>
        <button className="text-2xl text-base-300">
          <span className="icon-star" />
        </button>
        <button className="text-2xl text-base-300">
          <span className="icon-heart" />
        </button>
      </div>
      <div className="flex items-center">
        <button className="text-2xl text-base-300">
          <span className="icon-heart" />
        </button>
      </div>
    </div>
  );
};

export default GameFooter;
