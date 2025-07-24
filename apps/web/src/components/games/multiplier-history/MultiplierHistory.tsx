'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MultiplierHistoryProps {
  history: number[];
}

const MultiplierItem = ({ mult }: { mult: number }) => {
  const getMultiplierClass = (mult: number) =>
    mult > 0 ? 'bg-green-500 text-white' : 'bg-base-700 text-base-300';

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30, duration: 0.4 }}
      className={`flex items-center justify-center rounded-lg h-8 px-3 text-sm font-medium ${getMultiplierClass(mult)}`}
      aria-label={`Multiplier: x${mult.toFixed(2)}`}
    >
      x{mult.toFixed(2)}
    </motion.div>
  );
};

const MultiplierHistory = ({
  history,
}: MultiplierHistoryProps): React.ReactElement => {
  const lastMultipliers = history.slice(-5).reverse();

  return (
    <div className={`flex items-center ${lastMultipliers.length > 4 ? 'justify-between' : 'justify-start gap-3'}`}>
      <AnimatePresence>
        {lastMultipliers.map((mult, index) => (
          <MultiplierItem key={index} mult={mult} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MultiplierHistory;
