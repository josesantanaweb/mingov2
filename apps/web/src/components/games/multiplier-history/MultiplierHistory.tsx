'use client';
import React from 'react';

const MultiplierHistory = (): React.ReactElement => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center bg-base-700 rounded-lg h-8 px-2 text-base-300 text-sm font-medium">
        x0.00
      </div>
      <div className="flex items-center justify-center bg-base-700 rounded-lg h-8 px-2 text-base-300 text-sm font-medium">
        x0.00
      </div>
      <div className="flex items-center justify-center bg-base-700 rounded-lg h-8 px-2 text-base-300 text-sm font-medium">
        x0.00
      </div>
    </div>
  );
};

export default MultiplierHistory;
