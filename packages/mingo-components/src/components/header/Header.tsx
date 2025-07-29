'use client';
import React from 'react';
import Avatar from '../avatar';
import Deposit from '../deposit';
import Logo from '../logo';

interface HeaderProps {
  amount: number;
  avatar: string;
}

const Header = ({ amount, avatar }: HeaderProps): React.ReactElement => {
  return (
    <div className="flex px-4 items-center w-full bg-base-900 h-[70px] border-b border-base-700 justify-between sticky top-0 z-50">
      <Logo />
      <div className="flex gap-2">
        <Deposit amount={amount} isLoading={false} />
        <div className="cursor-pointer">
          <Avatar src={avatar} size={35} isLoading={false} />
        </div>
      </div>
    </div>
  );
};

export default Header;
