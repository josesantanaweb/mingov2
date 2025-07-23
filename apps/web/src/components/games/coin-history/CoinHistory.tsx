'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CoinTypeEnum } from '@/types/coin-flip';
import { getCoinImage, getCoinName } from '@/utils/flip-coin';

interface CoinHistoryProps {
  history: CoinTypeEnum[];
}

const CoinHistory = ({ history }: CoinHistoryProps): React.ReactElement => {
  const maxVisible = 10;
  const visibleHistory = history.slice(-maxVisible);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
      },
    },
  };

  if (history.length === 0) {
    return <div className="hidden" />;
  }

  return (
    <div className="flex flex-col gap-2">
      <motion.div
        className="flex items-center gap-2 flex-wrap "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {visibleHistory.map((coin, index) => (
          <motion.div
            key={`${coin}-${history.length - maxVisible + index}`}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              width={24}
              height={24}
              className="w-[24px] h-[24px] cursor-pointer transition-transform hover:brightness-110"
              src={getCoinImage(coin)}
              alt={getCoinName(coin)}
              aria-label={getCoinName(coin)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CoinHistory;
