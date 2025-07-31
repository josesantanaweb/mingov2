import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useProfile } from '@/hooks/users/useProfile';
import { CoinTypeEnum, CoinResultEnum } from '@/types/coin-flip';
import {
  getCoinOutcome,
  calculateWinAmount,
  getMultiplier,
} from '@/utils/coin-flip';
import { playSound } from '@/utils/play-sound';
import { useUpdateUser } from '@/hooks/users/useUpdate';

const BASE_MULTIPLIER = 1.2;
const BONUS_PER_WIN = 0.15;

export const useCoinFlip = () => {
  const { data: session } = useSession();
  const { data: profile } = useProfile();
  const { updateUser } = useUpdateUser();

  const updateBalance = async (amount: number) => {
    if (!session?.user?.id || !profile) return;

    const newBalance = (profile.balance || 0) + amount;

    try {
      await updateUser(session.user.id, { balance: newBalance });
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  const [flipping, setFlipping] = useState<boolean>(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [choice, setChoice] = useState<CoinTypeEnum | null>(null);
  const [result, setResult] = useState<CoinResultEnum | null>(null);
  const [coinResult, setCoinResult] = useState<CoinTypeEnum>(CoinTypeEnum.GOLD);
  const [totalWinnings, setTotalWinnings] = useState<number>(0);
  const [coinHistory, setCoinHistory] = useState<CoinTypeEnum[]>([]);
  const [multiplierHistory, setMultiplierHistory] = useState<number[]>([]);
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
      const winAmount = calculateWinAmount(selectedAmount, currentMultiplier);

      setCoinResult(outcome);
      setCoinHistory(prev => [...prev, outcome]);
      setFlipping(false);
      setResult(didWin ? CoinResultEnum.WIN : CoinResultEnum.LOSE);

      if (didWin) {
        setWinStreak(prev => prev + 1);
        setTotalWinnings(prev => prev * currentMultiplier);
        setChoice(null);
      } else {
        setTimeout(() => {
          setMultiplierHistory(prev => [...prev, 0]);
          setTotalWinnings(0);
          resetGame();
          setResult(null);
        }, 2200);
      }
    }, 1200);
  };

  const handleRetire = () => {
    playSound('/sounds/coin-flip/win.mp3');
    setMultiplierHistory(prev => [...prev, multiplier]);
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
    multiplierHistory,
    winStreak,
    resetGame,
    balance: profile?.balance ?? 0,
  };
};
