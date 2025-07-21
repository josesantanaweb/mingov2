'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '@mingo/ui';
import AmountInput from '@/components/bets/amount-input/AmountInput';
import AmountButton from '@/components/bets/amount-button/AmountButton';

const CoinFlip = (): React.ReactElement => {
  const [flipping, setFlipping] = useState(false);
  const [coin, setCoin] = useState<'GOLD' | 'SILVER'>('GOLD');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const predefinedAmounts = [10, 20, 50, 100];

  const handleFlip = () => {
    setFlipping(true);
    setTimeout(() => {
      setCoin(Math.random() < 0.5 ? 'GOLD' : 'SILVER');
      setFlipping(false);
    }, 1200);
  };

  const handleAmountSelect = (amount: number) => setSelectedAmount(amount);

  return (
    <section className="coin-flip flex justify-center items-center flex-col gap-3 w-full relative px-3 py-4">
      <div className="relative flex-shrink-0 rounded-xl cursor-pointer p-3 w-full bg-base-800">
        <div className="flex w-full justify-between items-center h-full">
          <div className="flex flex-col justify-center items-start gap-6">
            <Image
              src={
                coin === 'GOLD'
                  ? '/images/mini-games/gold-coin.png'
                  : '/images/mini-games/silver-coin.png'
              }
              width={120}
              height={120}
              className={`w-[120px] h-[120px] ${flipping ? 'animate-coin-flip' : ''}`}
              alt="coin"
            />
            <div className="flex items-center gap-2">
              <Image
                src="/images/mini-games/silver-coin.png"
                width={20}
                height={20}
                className="w-[20px] h-[20px]"
                alt="coin"
              />
              <Image
                src="/images/mini-games/silver-coin.png"
                width={20}
                height={20}
                className="w-[20px] h-[20px]"
                alt="coin"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-green-400 text-2xl font-semibold">x1.92</p>
            <p className="text-base-300 text-base font-medium">Multiplicador</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <AmountInput
          value={selectedAmount || 0}
          onChange={setSelectedAmount}
          maxValue={1000}
          placeholder="0"
        />
        <div className="grid grid-cols-4 items-center gap-3">
          {predefinedAmounts.map(amount => (
            <AmountButton
              key={amount}
              amount={amount}
              isSelected={selectedAmount === amount}
              onClick={handleAmountSelect}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 w-full">
        <Button variant="default" onClick={handleFlip} isFull>
          <Image
            src="/images/mini-games/gold-coin.png"
            width={20}
            height={20}
            className="w-[20px] h-[20px]"
            alt="coin"
          />
          CARA
        </Button>
        <Button variant="default" onClick={handleFlip} isFull>
          <Image
            src="/images/mini-games/silver-coin.png"
            width={20}
            height={20}
            className="w-[20px] h-[20px]"
            alt="coin"
          />
          CRUZ
        </Button>
      </div>
      <Button isFull variant="primary" onClick={handleFlip}>
        APUESTA
      </Button>
    </section>
  );
};

export default CoinFlip;
