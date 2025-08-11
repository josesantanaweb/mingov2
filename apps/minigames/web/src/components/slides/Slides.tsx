'use client';
import { Button, SelectAmount, NumberInput } from '@mingo/components';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

import GameWrapper from '@/components/common/game-wrapper';
import TopGames from '@/components/common/top-games';
import ModalGameWin from '@/components/common/modals/game-win';
import MultiplierHistory from '@/components/common/multiplier-history';

import { useGames, useLimbo } from '@/hooks';
import { MAX_MULTIPLIER, MAX_WIN_CHANCE, ASSETS } from '@/constants';
import SlideItem from './slide-item';
import Image from 'next/image';

const Slides = (): React.ReactElement => {
  const { data: games } = useGames();
  const {
    targetMultiplier,
    winChancePercentage,
    betAmount,
    setBetAmount,
    gameStarted,
    profitAmount,
    multiplierHistory,
    balance,
    buttonBetDisabled,
    handleBet,
    setTargetMultiplierAndChance,
    setWinChanceAndMultiplier,
    isWinModalVisible,
  } = useLimbo();

  const [isSpinning, setIsSpinning] = useState(false);
  const [spinOffset, setSpinOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calcular el ancho total de un slide (incluyendo gap)
  const SLIDE_WIDTH = 86; // ancho del slide
  const SLIDE_GAP = 12; // gap entre slides (gap-3 = 12px)
  const TOTAL_SLIDE_WIDTH = SLIDE_WIDTH + SLIDE_GAP;

  const SLIDES = [
    {
      id: 1,
      multiplier: 2,
      color: 'bg-base-700',
    },
    {
      id: 2,
      multiplier: 2,
      color: 'bg-red-500',
    },
    {
      id: 3,
      multiplier: 2,
      color: 'bg-base-700',
    },
    {
      id: 4,
      multiplier: 2,
      color: 'bg-red-500',
    },
    {
      id: 5,
      multiplier: 2,
      color: 'bg-base-700',
    },
    {
      id: 6,
      multiplier: 2,
      color: 'bg-red-500',
    },
    {
      id: 7,
      multiplier: 2,
      color: 'bg-base-700',
    },
    {
      id: 8,
      multiplier: 2,
      color: 'bg-red-500',
    },
    {
      id: 9,
      multiplier: 2,
      color: 'bg-base-700',
    },
    {
      id: 10,
      multiplier: 2,
      color: 'bg-red-500',
    },
    {
      id: 11,
      multiplier: 2,
      color: 'bg-base-700',
    },
    {
      id: 12,
      multiplier: 2,
      color: 'bg-red-500',
    },
    {
      id: 13,
      multiplier: 14,
      color: 'bg-primary-600',
    },
    {
      id: 14,
      multiplier: 2,
      color: 'bg-red-500',
    },
    {
      id: 15,
      multiplier: 2,
      color: 'bg-base-700',
    },
  ];

  // Crear slides duplicados para efecto infinito
  const INFINITE_SLIDES = [...SLIDES, ...SLIDES, ...SLIDES, ...SLIDES, ...SLIDES];

  // Función para resetear el offset cuando sea necesario
  const resetOffset = () => {
    if (spinOffset > TOTAL_SLIDE_WIDTH * SLIDES.length) {
      setSpinOffset(0);
    }
  };

  const startSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    // Generar un número aleatorio de rotaciones (entre 8 y 15 vueltas completas)
    const rotations = Math.random() * 7 + 8;
    // Añadir un offset aleatorio para que no siempre termine en el mismo lugar
    const randomOffset = Math.random() * TOTAL_SLIDE_WIDTH;
    const finalOffset = rotations * TOTAL_SLIDE_WIDTH + randomOffset;

    // Animar la transición
    setSpinOffset(prev => prev + finalOffset);

    // Detener el giro después de la animación
    setTimeout(() => {
      setIsSpinning(false);
      resetOffset();
    }, 5000);
  };

  return (
    <section className="limbo w-full relative p-4 mb-[100px]">
      <div className="flex flex-col gap-6 relative w-full">
        <GameWrapper>
          <MultiplierHistory multiplierHistory={multiplierHistory} />
          <div className="py-6 w-full flex flex-col gap-6 items-center relative">
            <div
              ref={containerRef}
              className="flex w-full max-w-full overflow-hidden justify-center items-center h-full relative min-h-[230px]"
            >
              <motion.div
                className="flex gap-3"
                animate={{ x: -spinOffset }}
                transition={{
                  duration: 5,
                  ease: [0.68, 0.01, 0.32, 1], // Curva que empieza rápido y desacelera
                  type: 'tween',
                }}
              >
                {INFINITE_SLIDES.map((slide, index) => (
                  <SlideItem key={`${slide.id}-${index}`} slide={slide} />
                ))}
              </motion.div>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
              <Image
                src={ASSETS.IMAGES.SLIDES.INDICATOR}
                alt="indicator"
                width={32}
                height={39}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <SelectAmount
              amount={betAmount}
              setAmount={setBetAmount}
              maxValue={balance}
              disabled={gameStarted}
            />

            <NumberInput
              value={targetMultiplier}
              onChange={setTargetMultiplierAndChance}
              maxValue={MAX_MULTIPLIER}
              variant="modal"
              actionsType="plus-minus"
            />

            <NumberInput
              value={winChancePercentage}
              onChange={setWinChanceAndMultiplier}
              maxValue={MAX_WIN_CHANCE}
              variant="modal"
              actionsType="none"
              disabled
            />

            <div className="flex gap-3">
              <Button
                data-testid="submit-bet"
                isFull
                variant="primary"
                onClick={handleBet}
                disabled={buttonBetDisabled}
              >
                Apuesta
              </Button>

                            <Button
                variant="default"
                onClick={startSpin}
                disabled={isSpinning}
                className="px-6"
              >
                {isSpinning ? 'Girando...' : 'Girar'}
              </Button>
            </div>
          </div>

          <ModalGameWin
            amount={profitAmount}
            multiplier={targetMultiplier}
            open={isWinModalVisible}
          />
        </GameWrapper>
        <TopGames games={games} />
      </div>
    </section>
  );
};

export default Slides;
