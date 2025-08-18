'use client';
import { Button, SelectAmount } from '@mingo/components';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import GameWrapper from '@/components/common/game-wrapper';
import TopGames from '@/components/common/top-games';
import { ResultEnum } from '@/types/common';
import MultiplierHistory, {
  IMultiplierHistory,
} from '@/components/common/multiplier-history';
import ModalGameWin from '@/components/common/modals/game-win';
import { useAdjustBalance, useGames } from '@/hooks';
import { ASSETS } from '@/constants';
import RockPaperScissorsOptions from './rock-paper-scissors-options';
import Image from 'next/image';
import { RockPaperScissorsEnum } from '@/types/common';

// Función para obtener la imagen correspondiente a cada opción del usuario (LEFT)
const getUserChoiceImage = (choice: RockPaperScissorsEnum | null): string => {
  if (!choice) return ASSETS.IMAGES.ROCK_PAPER_SCISSORS.ROCK_LEFT || '';

  switch (choice) {
    case RockPaperScissorsEnum.ROCK:
      return ASSETS.IMAGES.ROCK_PAPER_SCISSORS.ROCK_LEFT || '';
    case RockPaperScissorsEnum.PAPER:
      return ASSETS.IMAGES.ROCK_PAPER_SCISSORS.PAPER_LEFT || '';
    case RockPaperScissorsEnum.SCISSORS:
      return ASSETS.IMAGES.ROCK_PAPER_SCISSORS.SCISSORS_LEFT || '';
    default:
      return ASSETS.IMAGES.ROCK_PAPER_SCISSORS.ROCK_LEFT || '';
  }
};

// Función para obtener la imagen correspondiente a cada opción de la máquina (RIGHT)
const getMachineChoiceImage = (
  choice: RockPaperScissorsEnum | null,
): string => {
  if (!choice) return ASSETS.IMAGES.ROCK_PAPER_SCISSORS.ROCK_RIGHT || '';

  switch (choice) {
    case RockPaperScissorsEnum.ROCK:
      return ASSETS.IMAGES.ROCK_PAPER_SCISSORS.ROCK_RIGHT || '';
    case RockPaperScissorsEnum.PAPER:
      return ASSETS.IMAGES.ROCK_PAPER_SCISSORS.PAPER_RIGHT || '';
    case RockPaperScissorsEnum.SCISSORS:
      return ASSETS.IMAGES.ROCK_PAPER_SCISSORS.SCISSORS_RIGHT || '';
    default:
      return ASSETS.IMAGES.ROCK_PAPER_SCISSORS.ROCK_RIGHT || '';
  }
}; // Función para generar elección de la máquina
const getRandomChoice = (): RockPaperScissorsEnum => {
  const choices = [
    RockPaperScissorsEnum.ROCK,
    RockPaperScissorsEnum.PAPER,
    RockPaperScissorsEnum.SCISSORS,
  ];
  return choices[Math.floor(Math.random() * choices.length)];
};

// Función para determinar el ganador
const determineWinner = (
  playerChoice: RockPaperScissorsEnum,
  machineChoice: RockPaperScissorsEnum,
): ResultEnum | 'TIE' => {
  if (playerChoice === machineChoice) return 'TIE';

  const winConditions = {
    [RockPaperScissorsEnum.ROCK]: RockPaperScissorsEnum.SCISSORS,
    [RockPaperScissorsEnum.PAPER]: RockPaperScissorsEnum.ROCK,
    [RockPaperScissorsEnum.SCISSORS]: RockPaperScissorsEnum.PAPER,
  };

  return winConditions[playerChoice] === machineChoice
    ? ResultEnum.WIN
    : ResultEnum.LOSE;
};

const Slides = (): React.ReactElement => {
  const { data: games } = useGames();

  const [isWinModalVisible, setIsWinModalVisible] = useState<boolean>(false);
  const [profitAmount, setProfitAmount] = useState<number>(0);
  const [betAmount, setBetAmount] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [multiplierHistory, setMultiplierHistory] = useState<
    IMultiplierHistory[]
  >([]);
  const [choice, setChoice] = useState<RockPaperScissorsEnum | null>(null);
  const [machineChoice, setMachineChoice] =
    useState<RockPaperScissorsEnum | null>(null);
  const [gameResult, setGameResult] = useState<ResultEnum | 'TIE' | null>(null);
  const [isRevealing, setIsRevealing] = useState<boolean>(false);
  const [showMachineChoice, setShowMachineChoice] = useState<boolean>(false);

  const { adjustBalance, balance } = useAdjustBalance();

  const buttonBetDisabled =
    gameStarted || !betAmount || !choice || !!gameResult || !!machineChoice;
  const slideOptionsDisabled =
    !betAmount || gameStarted || !!gameResult || !!machineChoice;

  const handleChoice = (type: RockPaperScissorsEnum) => setChoice(type);

  const handleGameAction = async () => {
    // Solo iniciar el juego (el reinicio es automático)
    if (!choice || !betAmount) return;
    startGame();
  };

  const startGame = async () => {
    if (!choice || !betAmount) return;

    setGameStarted(true);
    setIsRevealing(true);
    setGameResult(null);
    setShowMachineChoice(false);

    // Generar elección de la máquina
    const machineChoice = getRandomChoice();
    setMachineChoice(machineChoice);

    // Revelar la elección de la máquina y mostrar resultado/modal después de 1s
    setTimeout(() => {
      setShowMachineChoice(true);
      const result = determineWinner(choice, machineChoice);
      setGameResult(result);

      // Calcular ganancia
      let profit = 0;
      if (result === ResultEnum.WIN) {
        profit = betAmount * 2; // Multiplicador x2 por ganar
        adjustBalance(profit);
        setProfitAmount(profit);
        setIsWinModalVisible(true);
      } else if (result === ResultEnum.LOSE) {
        adjustBalance(-betAmount);
      } else {
        // En caso de empate, no se pierde ni se gana
        profit = betAmount;
        adjustBalance(0);
      }

      // Agregar al historial
      const newHistory: IMultiplierHistory = {
        value: result === ResultEnum.WIN ? 2 : result === 'TIE' ? 1 : 0,
        result: result === 'TIE' ? ResultEnum.WIN : result, // Convertir TIE a WIN para el historial
      };
      setMultiplierHistory(prev => [newHistory, ...prev.slice(0, 9)]);

      setIsRevealing(false);
      setGameStarted(false);

      setTimeout(() => {
        resetGame();
      }, 2000);
    }, 1000); // Ahora todo ocurre tras la revelación visual
  };

  const resetGame = () => {
    setChoice(null);
    setMachineChoice(null);
    setGameResult(null);
    setIsRevealing(false);
    setGameStarted(false);
    setShowMachineChoice(false);
  };

  // Cerrar modal de victoria automáticamente
  useEffect(() => {
    if (isWinModalVisible) {
      const timer = setTimeout(() => {
        setIsWinModalVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isWinModalVisible]);

  return (
    <section className="limbo w-full relative p-4 mb-[100px]">
      <div className="flex flex-col gap-6 relative w-full">
        <GameWrapper>
          <MultiplierHistory multiplierHistory={multiplierHistory} />
          <div className="py-6 w-full flex flex-col gap-6 items-center">
            <div className="flex w-full items-center h-full relative min-h-[200px] max-h-[200px] justify-between">
              <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ x: -200, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  scale: isRevealing ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  x: { duration: 0.8, type: 'spring', bounce: 0.4 },
                  opacity: { duration: 0.5 },
                  scale: {
                    duration: isRevealing ? 0.6 : 0,
                    repeat: isRevealing ? 2 : 0,
                    repeatType: 'reverse',
                  },
                }}
              >
                <div className="h-24 flex items-center">
                  <Image
                    src={getUserChoiceImage(choice)}
                    alt={choice || 'rock'}
                    className="w-24 h-auto"
                    width={96}
                    height={96}
                  />
                </div>
              </motion.div>

              <p className="uppercase text-white text-3xl font-bold">vs</p>

              <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ x: 200, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  scale: isRevealing ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  x: { duration: 0.8, type: 'spring', bounce: 0.4 },
                  opacity: { duration: 0.5 },
                  scale: {
                    duration: isRevealing ? 0.6 : 0,
                    repeat: isRevealing ? 2 : 0,
                    repeatType: 'reverse',
                  },
                }}
              >
                {showMachineChoice && machineChoice ? (
                  <motion.div
                    className="h-24 flex items-center"
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      type: 'spring',
                      bounce: 0.6,
                    }}
                  >
                    <Image
                      src={getMachineChoiceImage(machineChoice)}
                      alt={machineChoice || 'unknown'}
                      className="w-24 h-auto"
                      width={96}
                      height={96}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    className="h-24 flex items-center"
                    animate={
                      isRevealing
                        ? {
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                          }
                        : {}
                    }
                    transition={
                      isRevealing
                        ? {
                            duration: 0.8,
                            repeat: Infinity,
                            repeatType: 'reverse',
                          }
                        : {}
                    }
                  >
                    <Image
                      src={ASSETS.IMAGES.ROCK_PAPER_SCISSORS.ROCK_RIGHT}
                      alt="default"
                      className="w-24 h-auto grayscale opacity-20"
                      width={96}
                      height={96}
                    />
                  </motion.div>
                )}
              </motion.div>

              {gameResult && !isRevealing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-0 left-0 transform text-center w-full"
                >
                  <p
                    className={`text-2xl font-bold ${
                      gameResult === ResultEnum.WIN
                        ? 'text-green-500'
                        : gameResult === 'TIE'
                          ? 'text-yellow-500'
                          : 'text-red-500'
                    }`}
                  >
                    {gameResult === ResultEnum.WIN
                      ? '¡Ganaste!'
                      : gameResult === 'TIE'
                        ? '¡Empate!'
                        : '¡Perdiste!'}
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <SelectAmount
              amount={betAmount}
              setAmount={setBetAmount}
              maxValue={balance}
              disabled={gameStarted}
            />

            <RockPaperScissorsOptions
              type={choice}
              onClick={handleChoice}
              disabled={slideOptionsDisabled}
            />

            <div className="flex gap-3">
              <Button
                data-testid="submit-bet"
                isFull
                variant="primary"
                onClick={handleGameAction}
                disabled={buttonBetDisabled}
              >
                Apuesta
              </Button>
            </div>
          </div>
          <ModalGameWin
            amount={profitAmount}
            multiplier={gameResult === ResultEnum.WIN ? 2 : 0}
            open={isWinModalVisible}
          />
        </GameWrapper>
        <TopGames games={games} />
      </div>
    </section>
  );
};

export default Slides;
