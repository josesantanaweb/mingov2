'use client';
import React from 'react';
import Image from 'next/image';

interface LeagueLogoProps {
  src: string;
}

const LeagueLogo = ({ src }: LeagueLogoProps): React.ReactElement => {
  return (
    <Image
      width={150}
      height={150}
      src={src}
      alt="Team 1"
      className="w-[130px] h-[106px] object-contain object-center absolute top-[30px] left-1/2 transform -translate-x-1/2 opacity-10 invert"
    />
  );
};

export default LeagueLogo;
