'use client';
import React from 'react';
import { Button } from '@mingo/components';
import { SelectAmount } from '@mingo/components';
import MultiplierHistory from '@/components/coin-flip/multiplier-history';
import CoinFlipping from '@/components/coin-flip/coin-flipping';
import CoinHistory from '@/components/coin-flip/coin-history';
import MultiplierLabel from '@/components/coin-flip/multiplier-label';
import CoinOptions from '@/components/coin-flip/coin-options';
import GameWrapper from '@/components/common/game-wrapper';
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
    winStreak,
    balance,
  } = useCoinFlip();

  const handleBet = totalWinnings > 0 ? handleRetire : handleStart;
  const canRetire = winStreak > 0;
  const isFlipping = flipping;
  const isNoAmount = !selectedAmount;
  const isLost = result === CoinResultEnum.LOSE;
  const isWaitingToRetire = gameStarted && winStreak === 0;
  const isBalanceInsufficient =
    !canRetire && (balance <= 0 || balance < selectedAmount);

  const buttonBetDisabled =
    isFlipping ||
    isNoAmount ||
    isLost ||
    isWaitingToRetire ||
    isBalanceInsufficient;
  const coinOptionsDisabled =
    isFlipping || !gameStarted || isLost;

  const buttonBetLabel = canRetire
    ? `Retirar  ${totalWinnings.toFixed(2)} ves`
    : 'Apuesta';

  return (
    <section className="coin-flip w-full relative p-4 mb-[100px]">
      <div className="flex flex-col gap-6">
        <GameWrapper>
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
              disabled={gameStarted}
            />

            <CoinOptions
              choice={choice}
              onClick={handleFlip}
              disabled={coinOptionsDisabled}
            />

            <Button
              data-testid="submit-bet"
              isFull
              variant="primary"
              onClick={handleBet}
              disabled={buttonBetDisabled}
            >
              {buttonBetLabel}
            </Button>
          </div>
        </GameWrapper>
        <TopGames games={games} />
      </div>
    </section>
  );
};

export default CoinFlip;
