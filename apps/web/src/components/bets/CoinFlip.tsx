'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '@mingo/ui';
import AmountInput from '@/components/bets/amount-input/AmountInput';
import AmountButton from '@/components/bets/amount-button/AmountButton';

interface IOption {
  label: string;
  value: 'GOLD' | 'SILVER';
}

const CoinFlip = (): React.ReactElement => {
  const [flipping, setFlipping] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [userChoice, setUserChoice] = useState<'GOLD' | 'SILVER' | null>(null);
  const [result, setResult] = useState<'win' | 'lose' | null>(null);
  const [coinResult, setCoinResult] = useState<'GOLD' | 'SILVER'>('GOLD');
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [coinHistory, setCoinHistory] = useState<string[]>([]);

  const predefinedAmounts = [10, 20, 50, 100];
  const options: IOption[] = [
    { label: 'cara', value: 'GOLD' },
    { label: 'cruz', value: 'SILVER' },
  ];

  const handleStart = () => {
    if (selectedAmount) {
      setGameStarted(true);
      setResult(null);
      setUserChoice(null);
      setCoinHistory([]);
      setCoinResult('GOLD');
    }
  };

  const handleFlip = (choice: 'GOLD' | 'SILVER') => {
    if (!choice || !selectedAmount) return;

    setUserChoice(choice);
    setFlipping(true);
    setResult(null);

    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? 'GOLD' : 'SILVER';
      const didWin = outcome === choice;
      const multiplier = 1.92;
      const winAmount = Math.round(selectedAmount * multiplier);

      setCoinResult(outcome);
      setCoinHistory(prev => [...prev, outcome]);
      setFlipping(false);
      setResult(didWin ? 'win' : 'lose');

      if (didWin) {
        setTotalWinnings(prev => prev + winAmount);
        setUserChoice(null);
        setResult(null);
      } else {
        setTimeout(() => {
          setGameStarted(false);
          setSelectedAmount(null);
          setUserChoice(null);
          setTotalWinnings(0);
          setCoinHistory([]);
          setCoinResult('GOLD');
        }, 1000);
      }
    }, 1200);
  };

  const handleRetire = () => {
    setGameStarted(false);
    setSelectedAmount(null);
    setUserChoice(null);
    setResult(null);
    setTotalWinnings(0);
    setCoinHistory([]);
    setCoinResult('GOLD');
  };

  return (
    <section className="coin-flip flex justify-center items-center flex-col gap-3 w-full relative px-3 py-4">
      <div className="relative flex-shrink-0 rounded-xl cursor-pointer p-3 w-full bg-base-800">
        <div className="flex w-full justify-between items-center h-full">
          <div className="flex flex-col justify-center items-start gap-6">
            <Image
              src={
                coinResult === 'GOLD'
                  ? '/images/mini-games/gold-coin.png'
                  : '/images/mini-games/silver-coin.png'
              }
              width={120}
              height={120}
              className={`w-[120px] h-[120px] ${flipping ? 'animate-coin-flip' : ''}`}
              alt="coin"
            />

            <div className="flex items-center gap-2">
              {coinHistory.map((coin, index) => (
                <Image
                  key={index}
                  src={`/images/mini-games/${coin === 'GOLD' ? 'gold-coin.png' : 'silver-coin.png'}`}
                  width={20}
                  height={20}
                  className="w-[20px] h-[20px]"
                  alt={coin}
                />
              ))}
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
              onClick={() => setSelectedAmount(amount)}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 w-full">
        {options.map(option => (
          <Button
            key={option.value}
            variant={userChoice === option.value ? 'primary' : 'default'}
            onClick={() => handleFlip(option.value)}
            disabled={flipping || !gameStarted}
            isFull
          >
            <Image
              src={
                option.value === 'GOLD'
                  ? '/images/mini-games/gold-coin.png'
                  : '/images/mini-games/silver-coin.png'
              }
              width={20}
              height={20}
              className="w-[20px] h-[20px]"
              alt="coin"
            />
            {option.label}
          </Button>
        ))}
      </div>

      <Button
        isFull
        variant="primary"
        onClick={totalWinnings > 0 ? handleRetire : handleStart}
        disabled={!selectedAmount}
      >
        {totalWinnings > 0 ? (
          <span>Retirar + {totalWinnings} ves</span>
        ) : (
          'Apuesta'
        )}
      </Button>

      {result && (
        <div className="text-center mt-4">
          <p
            className={`text-xl font-bold ${result === 'win' ? 'text-green-500' : 'text-red-500'}`}
          >
            {result === 'win' ? '¡Ganaste!' : 'Perdiste'}
          </p>
        </div>
      )}
    </section>
  );
};

export default CoinFlip;
