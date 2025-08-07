'use client';
import { useState, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { Button, SelectAmount, NumberInput } from '@mingo/components';

import GameWrapper from '@/components/common/game-wrapper';
import TopGames from '@/components/common/top-games';
import ModalGameWin from '@/components/common/modals/game-win';
import MultiplierHistory, {
  type IMultiplierHistory,
} from '@/components/common/multiplier-history';

import { useGames, useAuth, useProfile, useUpdateUser } from '@/hooks';
import {
  DEFAULT_MULTIPLIER,
  MIN_MULTIPLIER,
  MAX_MULTIPLIER,
  DEFAULT_WIN_CHANCE,
  MAX_WIN_CHANCE,
} from '@/constants/config';

const Limbo = (): React.ReactElement => {
  const [showWinModal, setShowWinModal] = useState<boolean>(false);
  const [multiplier, setMultiplier] = useState<number>(DEFAULT_MULTIPLIER);
  const [winChance, setWinChance] = useState<number>(DEFAULT_WIN_CHANCE);
  const [selectedAmount, setSelectedAmount] = useState<number>(0);

  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [resultMultiplier, setResultMultiplier] = useState<number | null>(null);
  const [displayValue, setDisplayValue] = useState(multiplier.toFixed(2));
  const [result, setResult] = useState<'WIN' | 'LOSE' | null>(null);
  const [winAmount, setWinAmount] = useState<number>(0);
  const [totalWinnings, setTotalWinnings] = useState<number>(0);
  const [multiplierHistory, setMultiplierHistory] = useState<
    IMultiplierHistory[]
  >([]);

  const animatedValue = useMotionValue(multiplier);
  const { data: games } = useGames();

  const { getCurrentUser } = useAuth();
  const { data: profile } = useProfile();
  const { updateUser } = useUpdateUser();
  const user = getCurrentUser();
  const balance = profile?.balance ?? 0;

  const updateBalance = async (amount: number) => {
    if (!user?.id || !profile) return;
    const newBalance = balance + amount;
    try {
      await updateUser(user.id, { balance: newBalance });
    } catch {
      // error actualizando balance
    }
  };

  useEffect(() => {
    const target = resultMultiplier !== null ? resultMultiplier : multiplier;
    const controls = animate(animatedValue, target, {
      duration: 0.5,
      ease: 'easeOut',
      onUpdate: v => setDisplayValue(v.toFixed(2)),
    });
    return () => controls.stop();
  }, [resultMultiplier, multiplier]);

  const handleStart = () => {
    if (!selectedAmount || balance < selectedAmount) return;
    setGameStarted(true);
    setResult(null);
    setResultMultiplier(null);
    setTotalWinnings(selectedAmount);
    setWinAmount(selectedAmount);
    updateBalance(-selectedAmount);
  };

  const handleBet = () => {
    if (!gameStarted) {
      handleStart();
    }

    const randomMultiplier = parseFloat(
      (
        Math.random() * (MAX_MULTIPLIER - MIN_MULTIPLIER) +
        MIN_MULTIPLIER
      ).toFixed(2),
    );

    const isWin = randomMultiplier >= multiplier;
    setResultMultiplier(randomMultiplier);

    setTimeout(() => {
      if (isWin) {
        const winnings = parseFloat((selectedAmount * multiplier).toFixed(2));
        setResult('WIN');
        setWinAmount(winnings);
        setTotalWinnings(winnings);
        setShowWinModal(true);
        setMultiplierHistory(prev => [
          ...prev,
          { value: randomMultiplier, result: 'WIN' },
        ]);
        updateBalance(winnings);
        setTimeout(() => setShowWinModal(false), 2000);
      } else {
        setResult('LOSE');
        setWinAmount(0);
        setTotalWinnings(0);
        setMultiplierHistory(prev => [
          ...prev,
          { value: randomMultiplier, result: 'LOSE' },
        ]);
      }
      setGameStarted(false);
    }, 1500);
  };

  const handleMultiplierChange = (value: number) => {
    setMultiplier(value);
    setWinChance(calculateWinChance(value));
  };

  const handleWinChanceChange = (value: number) => {
    setWinChance(value);
    setMultiplier(calculateMultiplier(value));
  };

  const calculateMultiplier = (winChance: number) => {
    return winChance > 0
      ? parseFloat((100 / winChance).toFixed(2))
      : MAX_MULTIPLIER;
  };

  const calculateWinChance = (multiplier: number) => {
    return multiplier > 0
      ? parseFloat((100 / multiplier).toFixed(2))
      : MAX_WIN_CHANCE;
  };

  const isBalanceInsufficient = balance <= 0 || selectedAmount > balance;

  const buttonBetDisabled =
    gameStarted || !selectedAmount || isBalanceInsufficient;

  return (
    <section className="limbo w-full relative p-4 mb-[100px]">
      <div className="flex flex-col gap-6 relative w-full">
        <GameWrapper>
          <MultiplierHistory multiplierHistory={multiplierHistory} />
          <div className="py-6 w-full flex flex-col gap-6 items-center">
            <div className="flex w-full justify-center items-center h-full relative min-h-[230px]">
              <motion.h1
                className={`text-5xl font-black ${
                  result === 'WIN'
                    ? 'text-green-500'
                    : result === 'LOSE'
                      ? 'text-red-500'
                      : 'text-white'
                }`}
                initial={false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 30,
                  duration: 0.4,
                }}
              >
                {displayValue}x
              </motion.h1>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <SelectAmount
              amount={selectedAmount}
              setAmount={setSelectedAmount}
              maxValue={balance}
              disabled={gameStarted}
            />

            <NumberInput
              value={multiplier}
              onChange={handleMultiplierChange}
              maxValue={MAX_MULTIPLIER}
              placeholder="0.00"
              variant="modal"
              showPlusMinus={true}
            />

            <NumberInput
              value={winChance}
              onChange={handleWinChanceChange}
              maxValue={MAX_WIN_CHANCE}
              placeholder="0.00"
              variant="modal"
              showPlusMinus={true}
            />

            <Button
              data-testid="submit-bet"
              isFull
              variant="primary"
              onClick={handleBet}
              disabled={buttonBetDisabled}
            >
              Apuesta
            </Button>
          </div>

          <ModalGameWin
            amount={winAmount}
            multiplier={multiplier}
            open={showWinModal}
          />
        </GameWrapper>
        <TopGames games={games} />
      </div>
    </section>
  );
};

export default Limbo;
