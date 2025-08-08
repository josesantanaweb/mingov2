import React, { useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import { ResultEnum } from '@/types/common';
import { playSound } from '@/utils/play-sound';

interface MultiplierLabelProps {
  result: ResultEnum | null;
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

    if (result === ResultEnum.LOSE) {
      from = multiplier;
      to = 0;
    }

    motionValue.set(from);
    animate(motionValue, to, {
      duration: 0.6,
      ease: 'easeOut',
    });

    if (result === ResultEnum.WIN) {
      playSound('/sounds/coin-flip/multiplier-win.mp3');
    }
    if (result === ResultEnum.LOSE) {
      playSound('/sounds/coin-flip/multiplier-lose.mp3');
    }
  }, [multiplier, result, selectedAmount]);

  const getMultiplierColor = (): string => {
    switch (result) {
      case ResultEnum.WIN:
        return 'text-green-500';
      case ResultEnum.LOSE:
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
