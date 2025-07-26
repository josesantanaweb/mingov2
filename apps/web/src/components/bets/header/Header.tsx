'use client';
import React from 'react';
import { Avatar } from '@mingo/components';
import Deposit from '@/components/deposit';
import Logo from '@/components/logo';

const Header = (): React.ReactElement => {
  return (
    <div className="flex px-4 items-center w-full bg-base-900 h-[70px] border-b border-base-700 justify-between sticky top-0 z-50">
      <Logo />
      <div className="flex gap-2">
        <Deposit amount={10000} isLoading={false} />
        <div className="cursor-pointer">
          <Avatar src="/images/users/05.png" size={35} isLoading={false} />
        </div>
      </div>
    </div>
  );
};

export default Header;
