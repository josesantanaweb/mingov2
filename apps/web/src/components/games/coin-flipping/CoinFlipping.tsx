'use client';
import React from 'react';
import Image from 'next/image';
import { CoinTypeEnum } from '@/types/coin-flip';
import { getCoinImage, getCoinName } from '@/utils/flip-coin';

interface CoinFlippingProps {
  flipping: boolean;
  coinResult: CoinTypeEnum;
}

const CoinFlipping = ({
  flipping,
  coinResult,
}: CoinFlippingProps): React.ReactElement => {
  return (
    <Image
      width={120}
      height={120}
      className={`w-[160px] h-[160px] ${flipping ? 'animate-coin-flip' : ''}`}
      src={getCoinImage(coinResult)}
      alt={getCoinName(coinResult)}
      aria-label={getCoinName(coinResult)}
    />
  );
};

export default CoinFlipping;
