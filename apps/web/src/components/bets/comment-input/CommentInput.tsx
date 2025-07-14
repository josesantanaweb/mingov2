'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommentInputProps {
  onSubmit?: (comment: string) => void;
}

const CommentInput = ({ onSubmit }: CommentInputProps): React.ReactElement => {
  const [comment, setComment] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setComment(e.target.value);

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit?.(comment);
      setComment('');
      setIsFocused(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const showSendButton = comment.trim().length > 0 || isFocused;

  return (
    <div className="flex items-center gap-3">
      <motion.input
        type="text"
        value={comment}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="flex-1 px-6 text-base text-white transition-all rounded-lg h-11 bg-base-700 focus:outline-none placeholder:text-base-300"
        placeholder="Escribe tu comentario..."
      />

      <AnimatePresence>
        {showSendButton && (
          <motion.button
            type="button"
            onClick={handleSubmit}
            className="flex items-center justify-center flex-shrink-0 text-white transition-colors rounded-full w-11 h-11 bg-primary-500 hover:bg-primary-600"
            initial={{ x: 20, opacity: 0, scale: 0.8, width: 0 }}
            animate={{ x: 0, opacity: 1, scale: 1, width: 44 }}
            exit={{ x: 20, opacity: 0, scale: 0.8, width: 0 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
              duration: 0.3,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="text-xl rotate-90 icon-arrow"
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommentInput;
