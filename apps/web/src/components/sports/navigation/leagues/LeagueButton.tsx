'use client';
import React from 'react';
import Image from 'next/image';

interface LeagueButtonProps {
  name: string;
  logo?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const LeagueButton = ({
  name,
  logo,
  isSelected = false,
  onClick,
}: LeagueButtonProps): React.ReactElement => {
  return (
    <button
      onClick={onClick}
      className={`flex gap-2 items-center transition-all rounded-full px-4 h-[40px] flex-shrink-0 cursor-pointer ${isSelected ? 'bg-violet-500' : 'bg-base-500 hover:bg-base-400'}`}
    >
      {logo && (
        <Image
          src={logo}
          alt={name}
          className="w-5 h-5"
          width={20}
          height={20}
        />
      )}
      <p className="text-white text-sm font-medium">{name}</p>
    </button>
  );
};

export default LeagueButton;
