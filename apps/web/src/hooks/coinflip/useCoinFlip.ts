import { useState } from 'react';
import { CoinEnum, CoinResultEnum } from '@/types/coinflip';
import {
  getCoinOutcome,
  calculateWinAmount,
  getMultiplier,
} from '@/utils/coin-flip';

const BASE_MULTIPLIER = 1.2;
const BONUS_PER_WIN = 0.15;

export const useCoinFlip = () => {
  const [flipping, setFlipping] = useState<boolean>(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [choice, setChoice] = useState<CoinEnum | null>(null);
  const [result, setResult] = useState<CoinResultEnum | null>(null);
  const [coinResult, setCoinResult] = useState<CoinEnum>(CoinEnum.HEADS);
  const [totalWinnings, setTotalWinnings] = useState<number>(0);
  const [coinHistory, setCoinHistory] = useState<CoinEnum[]>([]);
  const [multiplierHistory, setMultiplierHistory] = useState<number[]>([]);
  const [winStreak, setWinStreak] = useState<number>(0);

  const multiplier = getMultiplier(BASE_MULTIPLIER, BONUS_PER_WIN, winStreak);

  const handleStart = () => {
    if (!selectedAmount) return;
    setGameStarted(true);
    const audio = new Audio('/sounds/coin-flip/start.mp3');
    audio.play();
    setResult(null);
    setChoice(null);
    setCoinHistory([]);
    setCoinResult(CoinEnum.HEADS);
  };

  const handleFlip = (choice: CoinEnum) => {
    if (!selectedAmount || flipping) return;

    setChoice(choice);
    setFlipping(true);
    const audio = new Audio('/sounds/coin-flip/flip.mp3');
    audio.play();
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
        setTotalWinnings(prev => prev + winAmount);
        setChoice(null);
      } else {
        setTimeout(() => {
          setMultiplierHistory(prev => [...prev, 0]);
          resetGame();
          setResult(null);
        }, 2200);
      }
    }, 1200);
  };

  const handleRetire = () => {
    const audio = new Audio('/sounds/coin-flip/win.mp3');
    audio.play();
    setMultiplierHistory(prev => [...prev, multiplier]);
    resetGame();
  };

  const resetGame = () => {
    setGameStarted(false);
    setSelectedAmount(null);
    setChoice(null);
    setTotalWinnings(0);
    setCoinHistory([]);
    setCoinResult(CoinEnum.HEADS);
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
  };
};
