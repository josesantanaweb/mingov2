'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const MainBanner = (): React.ReactElement => {
  return (
    <div className="relative rounded-lg overflow-hidden">
      <Image
        src="/images/banner.png"
        width={5000}
        height={200}
        alt="Banner"
        className="w-full h-[150px] object-cover rounded-lg"
      />
    </div>
  );
};

export default MainBanner;
