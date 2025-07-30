'use client';
import React from 'react';
import Avatar from '../avatar';
import Deposit from '../deposit';
import Logo from '../logo';
import Button from '../button';

interface HeaderProps {
  balance: number;
  avatar: string;
  hasSession: boolean;
  onLogin?: () => void;
  onRegister?: () => void;
  onLogout?: () => void;
}

const Header = ({
  balance,
  avatar,
  hasSession,
  onLogin,
  onRegister,
  onLogout,
}: HeaderProps): React.ReactElement => {
  return (
    <div className="flex px-4 items-center w-full bg-base-900 h-[70px] border-b border-base-700 justify-between sticky top-0 z-50">
      <Logo />
      {hasSession && (
        <div className="flex gap-2">
          <Deposit balance={balance} isLoading={false} />
          <div className="cursor-pointer" onClick={onLogout}>
            <Avatar src={avatar} size={35} isLoading={false} />
          </div>
        </div>
      )}
      {!hasSession && (
        <div className="flex gap-6">
          <button
            className="text-xs text-white uppercase font-medium"
            onClick={onLogin}
          >
            Iniciar Sesión
          </button>
          <Button variant="primary" size="sm" onClick={onRegister}>
            Registrate
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
