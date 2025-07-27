'use client';
import React from 'react';
import { Button } from '@mingo/components';
import { SelectAmount } from '@mingo/components';
import GameFooter from '@/components/coin-flip/game-footer';
import MultiplierHistory from '@/components/coin-flip/multiplier-history';
import CoinFlipping from '@/components/coin-flip/coin-flipping';
import CoinHistory from '@/components/coin-flip/coin-history';
import MultiplierLabel from '@/components/coin-flip/multiplier-label';
import CoinOptions from '@/components/coin-flip/coin-options';
import { useCoinFlip, useGames } from '@/hooks';
import { CoinResultEnum } from '@/types/coin-flip';
import TopGames from './top-games';

const CoinFlip = (): React.ReactElement => {
  const { data: games } = useGames();
  const {
    flipping,
    selectedAmount,
    setSelectedAmount,
    gameStarted,
    choice,
    coinResult,
    result,
    coinHistory,
    multiplier,
    handleFlip,
    handleStart,
    handleRetire,
    totalWinnings,
    multiplierHistory,
  } = useCoinFlip();

  const handleBet = totalWinnings > 0 ? handleRetire : handleStart;
  const buttonBetDisabled =
    flipping || !selectedAmount || result === CoinResultEnum.LOSE;
  const coinOptionsDisabled =
    flipping || !gameStarted || result === CoinResultEnum.LOSE;
  const buttonBetLabel =
    totalWinnings > 0 || result === CoinResultEnum.WIN
      ? `Retirar  ${totalWinnings} ves`
      : 'Apuesta';

  return (
    <section className="coin-flip w-full relative px-3 py-4 mb-[100px]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <div className="flex flex-col bg-base-800 p-5 w-full rounded-t-xl">
            <MultiplierHistory history={multiplierHistory} />
            <div className="py-6 w-full flex flex-col gap-6 items-center">
              <div className="flex w-full justify-center items-center h-full relative">
                <span className="flex-1" />
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
              <SelectAmount
                amount={selectedAmount}
                setAmount={setSelectedAmount}
              />

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
        </div>
        <TopGames games={games} />
      </div>
    </section>
  );
};

export default CoinFlip;
