'use client';
import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mingo/components';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import { ROOMS_ROUTE } from '@/constants';

interface UserDropdownProps {
  avatar: string;
}

const UserDropdown = ({ avatar }: UserDropdownProps): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className="relative flex flex-col items-center bg-base-600">
      <div onClick={handleToggle} className="cursor-pointer">
        <Avatar
          src={avatar}
          size={45}
          className="border-[3px] border-base-500"
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 right-4 w-[240px] bg-base-500 rounded-lg shadow-lg z-10 p-3"
          >
            <Link
              href={ROOMS_ROUTE}
              className="flex items-center gap-3 px-4 py-2 text-base transition-all rounded-lg cursor-pointer text-base-300 hover:text-white hover:bg-base-400"
            >
              <FontAwesomeIcon icon={faWallet} fontSize={18} width={18} />
              Billetera
            </Link>
            <Link
              href={ROOMS_ROUTE}
              className="flex items-center gap-3 px-4 py-2 text-base transition-all rounded-lg cursor-pointer text-base-300 hover:text-white hover:bg-base-400"
            >
              <FontAwesomeIcon icon={faWallet} fontSize={18} width={18} />
              Retirar
            </Link>
            <Link
              href={ROOMS_ROUTE}
              className="flex items-center gap-3 px-4 py-2 text-base transition-all rounded-lg cursor-pointer text-base-300 hover:text-white hover:bg-base-400"
            >
              <FontAwesomeIcon icon={faWallet} fontSize={18} width={18} />
              Historial
            </Link>
            <button
              onClick={() => signOut()}
              className="flex items-center w-full gap-3 px-4 py-2 text-base transition-all rounded-lg cursor-pointer text-base-300 hover:text-white hover:bg-base-400"
            >
              <FontAwesomeIcon icon={faWallet} fontSize={18} width={18} />
              Cerrar sesión
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
