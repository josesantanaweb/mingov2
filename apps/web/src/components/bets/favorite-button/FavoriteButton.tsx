'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface FavoriteButtonProps {
  isFavorite: boolean;
  setIsfavorite: (isFavorite) => void;
}

const FavoriteButton = ({
  isFavorite,
  setIsfavorite,
}: FavoriteButtonProps): React.ReactElement => {
  const handleFavorite = () => setIsfavorite(!isFavorite);

  return (
    <motion.button
      onClick={handleFavorite}
      className={`flex items-center gap-1 transition-colors duration-200 cursor-pointer ${isFavorite ? 'text-orange-500' : 'text-base-300'}`}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.span
        className={`text-xl ${isFavorite ? 'icon-star' : 'icon-star-line'}`}
        animate={{
          rotate: isFavorite ? [0, -10, 10, -10, 0] : 0,
          scale: isFavorite ? [1, 1.1, 1] : 1
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
      />
      <motion.p
        className="text-sm font-medium"
        animate={{ opacity: [0.7, 1] }}
        transition={{ duration: 0.3 }}
      >
        {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      </motion.p>
    </motion.button>
  );
};

export default FavoriteButton;
