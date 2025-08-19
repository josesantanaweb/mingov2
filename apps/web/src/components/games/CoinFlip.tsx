'use client';
import React from 'react';
import { Button } from '@mingo/components';
import SelectAmount from '@/components/bets/select-amount';
import GameFooter from '@/components/games/game-footer';
import MultiplierHistory from '@/components/games/multiplier-history';
import CoinFlipping from '@/components/games/coin-flipping';
import CoinHistory from '@/components/games/coin-history';
import MultiplierLabel from '@/components/games/multiplier-label';
import CoinOptions from '@/components/games/coin-options';
import { useCoinFlip } from '@/hooks/coinflip/useCoinFlip';
import { CoinResultEnum } from '@/types/coinflip';

const CoinFlip = (): React.ReactElement => {
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
  const buttonBetDisabled = flipping || !selectedAmount || result === CoinResultEnum.LOSE;
  const coinOptionsDisabled = flipping || !gameStarted || result === CoinResultEnum.LOSE;
  const buttonBetLabel =
    (totalWinnings > 0 || result === CoinResultEnum.WIN) ? `Retirar  ${totalWinnings} ves` : 'Apuesta';

  return (
    <section className="coin-flip w-full relative px-3 py-4">
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
