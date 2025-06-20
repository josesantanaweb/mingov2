'use client';
import React from 'react';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps): React.ReactElement => {
  return (
    <div className="flex flex-col w-full p-10">
      <div className="flex flex-col w-full rounded-xl bg-base-600">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
