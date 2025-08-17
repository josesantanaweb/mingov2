import React, { useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import { CoinResultEnum } from '@/types/coinflip';

interface MultiplierLabelProps {
  result: CoinResultEnum | null;
  selectedAmount: number | null;
  multiplier: number;
}

const MultiplierLabel = ({
  result,
  selectedAmount,
  multiplier,
}: MultiplierLabelProps): React.ReactElement => {
  const motionValue = useMotionValue(0);
  const animatedValue = useTransform(motionValue, value => value.toFixed(2));
  const [displayValue, setDisplayValue] = useState('0.00');

  useEffect(() => {
    const unsubscribe = animatedValue.on('change', v => setDisplayValue(v));
    return () => unsubscribe();
  }, [animatedValue]);

  useEffect(() => {
    if (selectedAmount === null) return;

    let from = 0;
    let to = multiplier;

    if (result === CoinResultEnum.LOSE) {
      from = multiplier;
      to = 0;
    }

    motionValue.set(from);
    animate(motionValue, to, {
      duration: 0.6,
      ease: 'easeOut',
    });

    // Sonido
    if (result === CoinResultEnum.WIN) {
      const audio = new Audio('/sounds/coinflip/multiplier-win.mp3');
      audio.play();
    }
    if (result === CoinResultEnum.LOSE) {
      const audio = new Audio('/sounds/coinflip/multiplier-lose.mp3');
      audio.play();
    }
    // eslint-disable-next-line
  }, [multiplier, result, selectedAmount]);

  const getMultiplierColor = (): string => {
    switch (result) {
      case CoinResultEnum.WIN:
        return 'text-green-500';
      case CoinResultEnum.LOSE:
        return 'text-red-500';
      default:
        return 'text-base-300';
    }
  };

  const colorClass = getMultiplierColor();

  return (
    <div className="flex-1 h-[50px] overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={result + multiplier}
          initial={{ opacity: 0, y: 70, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 70, scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
            duration: 0.4,
          }}
          className="flex items-center gap-1 flex-col"
        >
          <p className={`text-xl font-bold ${colorClass}`}>x{displayValue}</p>
          <p className="text-base-300 text-xs font-medium">Multiplicador</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MultiplierLabel;
