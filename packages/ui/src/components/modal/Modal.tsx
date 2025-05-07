'use client';

import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '../../utils/cn';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactNode;
  className?: string;
  closeOnBackdropClick?: boolean;
}

const Modal = ({
  open,
  setOpen,
  children,
  className,
  closeOnBackdropClick = true,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => closeOnBackdropClick && setOpen(false)}
          />

          <motion.div
            className="fixed z-50 w-full h-full transform flex items-center justify-center top-0 left-0 p-6 transition-all"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <div
              className={cn(
                'rounded-[20px] overflow-hidden relative',
                className,
              )}
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
