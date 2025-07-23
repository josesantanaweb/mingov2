'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@mingo/ui';
import { CoinTypeEnum } from '@/types/coin-flip';
import { getCoinImage, getCoinName } from '@/utils/flip-coin';

interface IOption {
  label: string;
  value: CoinTypeEnum;
}

interface CoinOptionsProps {
  disabled: boolean;
  choice: CoinTypeEnum | null;
  onClick: (option: CoinTypeEnum) => void;
}

const CoinOptions = ({
  disabled,
  choice,
  onClick,
}: CoinOptionsProps): React.ReactElement => {
  const options: IOption[] = [
    { label: 'cara', value: CoinTypeEnum.GOLD },
    { label: 'cruz', value: CoinTypeEnum.SILVER },
  ];

  const getVariant = (value: CoinTypeEnum) =>
    choice === value ? 'primary' : 'default';

  return (
    <div className="flex items-center gap-3 w-full">
      {options.map(option => (
        <Button
          key={option.value}
          variant={getVariant(option.value)}
          onClick={() => onClick(option.value)}
          disabled={disabled}
          isFull
        >
          <Image
            src={getCoinImage(option.value)}
            alt={getCoinName(option.value)}
            aria-label={getCoinName(option.value)}
            width={20}
            height={20}
            className="w-[20px] h-[20px]"
          />
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default CoinOptions;
