'use client';
import React, { useState } from 'react';
import { Button } from '@mingo/ui';
import SelectAmount from '@/components/bets/select-amount';
import GameFooter from '@/components/games/game-footer';
import MultiplierHistory from '@/components/games/multiplier-history';
import CoinFlipping from '@/components/games/coin-flipping';
import CoinHistory from '@/components/games/coin-history';
import MultiplierLabel from '@/components/games/multiplier-label';
import CoinOptions from '@/components/games/coin-options';
import { CoinTypeEnum, CoinResultEnum } from '@/types/coin-flip';

const CoinFlip = (): React.ReactElement => {
  const [flipping, setFlipping] = useState<boolean>(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [choice, setChoice] = useState<CoinTypeEnum | null>(null);
  const [result, setResult] = useState<CoinResultEnum | null>(null);
  const [coinResult, setCoinResult] = useState<CoinTypeEnum>(CoinTypeEnum.GOLD);
  const [totalWinnings, setTotalWinnings] = useState<number>(0);
  const [coinHistory, setCoinHistory] = useState<CoinTypeEnum[]>([]);
  const [winStreak, setWinStreak] = useState<number>(0);

  const baseMultiplier = 1.92; // TODO: Make this dynamic based on game state
  const bonusPerWin = 0.1; // TODO: Make this dynamic based on game state
  const multiplier = baseMultiplier + winStreak * bonusPerWin;

  const handleStart = () => {
    if (selectedAmount) {
      setGameStarted(true);
      setResult(null);
      setChoice(null);
      setCoinHistory([]);
      setCoinResult(CoinTypeEnum.GOLD);
    }
  };

  const handleFlip = (choice: CoinTypeEnum.GOLD | CoinTypeEnum.SILVER) => {
    if (!choice || !selectedAmount) return;

    setChoice(choice);
    setFlipping(true);
    setResult(null);

    setTimeout(() => {
      const outcome =
        Math.random() < 0.5 ? CoinTypeEnum.GOLD : CoinTypeEnum.SILVER;
      const didWin = outcome === choice;
      const winAmount = Math.round(selectedAmount * multiplier);

      setCoinResult(outcome);
      setCoinHistory(prev => [...prev, outcome]);
      setFlipping(false);
      setResult(didWin ? CoinResultEnum.WIN : CoinResultEnum.LOSE);

      if (didWin) {
        setWinStreak(prev => prev + 1);
        setTotalWinnings(prev => prev + winAmount);
        setChoice(null);
        setResult(CoinResultEnum.WIN);
      } else {
        setTimeout(() => {
          setGameStarted(false);
          setSelectedAmount(null);
          setChoice(null);
          setTotalWinnings(0);
          setWinStreak(0);
          setCoinHistory([]);
          setCoinResult(CoinTypeEnum.GOLD);
          setResult(CoinResultEnum.LOSE);
          setTimeout(() => {
            setResult(null);
          }, 1200);
        }, 1000);
      }
    }, 1200);
  };

  const handleRetire = () => {
    setGameStarted(false);
    setSelectedAmount(null);
    setChoice(null);
    setResult(null);
    setTotalWinnings(0);
    setCoinHistory([]);
    setCoinResult(CoinTypeEnum.GOLD);
  };

  const handleBet = totalWinnings > 0 ? handleRetire : handleStart;
  const buttonBetDisabled = !selectedAmount || flipping;
  const coinOptionsDisabled = flipping || !gameStarted;
  const buttonBetLabel =
    totalWinnings > 0 ? `Retirar  ${totalWinnings} ves` : 'Apuesta';

  return (
    <section className="coin-flip w-full relative px-3 py-4">
      <div className="flex flex-col bg-base-800 p-5 w-full rounded-t-xl">
        <MultiplierHistory />
        <div className="py-6 w-full flex flex-col gap-6 items-center">
          <div className="flex w-full justify-center items-center h-full relative">
            <CoinFlipping flipping={flipping} coinResult={coinResult} />
            <MultiplierLabel
              result={result}
              selectedAmount={selectedAmount}
              multiplier={multiplier}
            />
          </div>
          <CoinHistory history={coinHistory} />
        </div>
        <div className="flex flex-col gap-3">
          <SelectAmount amount={selectedAmount} setAmount={setSelectedAmount} />

          <CoinOptions
            choice={choice}
            onClick={handleFlip}
            disabled={coinOptionsDisabled}
          />

          <Button
            isFull
            variant="primary"
            onClick={handleBet}
            disabled={buttonBetDisabled}
          >
            {buttonBetLabel}
          </Button>
        </div>
      </div>
      <GameFooter />
    </section>
  );
};

export default CoinFlip;
