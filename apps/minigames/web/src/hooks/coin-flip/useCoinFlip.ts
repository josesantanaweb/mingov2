import { useState } from 'react';
import { useAuth, useProfile, useUpdateUser } from '@/hooks';

import { CoinTypeEnum, CoinResultEnum } from '@/types/coin-flip';

import { getCoinOutcome, getMultiplier } from '@/utils/coin-flip';
import { playSound } from '@/utils/play-sound';

import type { IMultiplierHistory } from '@/components/common/multiplier-history';

import { BASE_MULTIPLIER, BONUS_PER_WIN } from '@/constants';

export const useCoinFlip = () => {
  const { getCurrentUser } = useAuth();
  const { data: profile } = useProfile();
  const { updateUser } = useUpdateUser();

  const user = getCurrentUser();

  const updateBalance = async (amount: number) => {
    if (!user?.id || !profile) return;

    const newBalance = (profile.balance || 0) + amount;

    try {
      await updateUser(user.id, { balance: newBalance });
    } catch {
      // Error updating balance
    }
  };

  const [flipping, setFlipping] = useState<boolean>(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [choice, setChoice] = useState<CoinTypeEnum | null>(null);
  const [result, setResult] = useState<CoinResultEnum | null>(null);
  const [coinResult, setCoinResult] = useState<CoinTypeEnum>(CoinTypeEnum.GOLD);
  const [totalWinnings, setTotalWinnings] = useState<number>(0);
  const [winAmount, setWinAmount] = useState<number>(0);
  const [coinHistory, setCoinHistory] = useState<CoinTypeEnum[]>([]);
  const [multiplierHistory, setMultiplierHistory] = useState<IMultiplierHistory[]>([]);
  const [winStreak, setWinStreak] = useState<number>(0);

  const multiplier = getMultiplier(BASE_MULTIPLIER, BONUS_PER_WIN, winStreak);

  const handleStart = () => {
    if (!selectedAmount) return;

    updateBalance(-selectedAmount);

    setGameStarted(true);
    playSound('/sounds/coin-flip/start.mp3');
    setResult(null);
    setChoice(null);
    setCoinHistory([]);
    setCoinResult(CoinTypeEnum.GOLD);
    setTotalWinnings(selectedAmount);
    setWinAmount(selectedAmount);
  };

  const handleFlip = (choice: CoinTypeEnum) => {
    if (!selectedAmount || flipping) return;

    setChoice(choice);
    setFlipping(true);
    playSound('/sounds/coin-flip/flip.mp3');
    setResult(null);

    setTimeout(() => {
      const outcome = getCoinOutcome();
      const didWin = outcome === choice;
      const currentMultiplier = getMultiplier(
        BASE_MULTIPLIER,
        BONUS_PER_WIN,
        winStreak,
      );

      setCoinResult(outcome);
      setCoinHistory(prev => [...prev, outcome]);
      setFlipping(false);
      setResult(didWin ? CoinResultEnum.WIN : CoinResultEnum.LOSE);

      if (didWin) {
        setWinStreak(prev => prev + 1);
        setTotalWinnings(prev => prev * currentMultiplier);
        setWinAmount(prev => prev * currentMultiplier);
        setChoice(null);
      } else {
        setTimeout(() => {
          setMultiplierHistory(prev => [
            ...prev,
            { value: currentMultiplier, result: CoinResultEnum.LOSE },
          ]);
          setTotalWinnings(0);
          setWinAmount(0);
          resetGame();
          setResult(null);
        }, 2200);
      }
    }, 1200);
  };

  const handleRetire = () => {
    playSound('/sounds/coin-flip/win.mp3');
    setMultiplierHistory(prev => [
      ...prev,
      { value: multiplier, result: CoinResultEnum.WIN },
    ]);
    setWinStreak(0);
    updateBalance(totalWinnings);
    resetGame();
    setResult(null);
  };

  const resetGame = () => {
    setGameStarted(false);
    setSelectedAmount(null);
    setChoice(null);
    setTotalWinnings(0);
    setCoinHistory([]);
    setCoinResult(CoinTypeEnum.GOLD);
    setWinStreak(0);
  };

  return {
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
    winAmount,
    multiplierHistory,
    winStreak,
    resetGame,
    balance: profile?.balance ?? 0,
    setChoice,
  };
};
