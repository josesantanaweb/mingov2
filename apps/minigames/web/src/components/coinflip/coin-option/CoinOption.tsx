'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@mingo/components';
import { CoinEnum } from '@/types/common';
import { getCoinImage, getCoinName } from '@/components/coinflip/utils';

interface IOption {
  label: string;
  value: CoinEnum;
}

interface CoinOptionProps {
  disabled: boolean;
  choice: CoinEnum | null;
  onClick: (option: CoinEnum) => void;
}

const CoinOption = ({
  disabled,
  choice,
  onClick,
}: CoinOptionProps): React.ReactElement => {
  const options: IOption[] = [
    { label: 'cara', value: CoinEnum.HEADS },
    { label: 'sello', value: CoinEnum.TAILS },
  ];

  const getVariant = (value: CoinEnum) =>
    choice === value ? 'primary' : 'default';

  return (
    <div className="flex items-center gap-3 w-full">
      {options.map(option => (
        <Button
          data-testid={`side-head-${option.value}`}
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

export default CoinOption;
