'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import type { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';

import { useStore } from '@/store';
import { useProfile } from '@/hooks/users/useProfile';
import Notifications from '@/components/notifications';
import Configuration from '@/components/configuration';
import Search from '@/components/search';
import Deposit from '@/components/deposit';
import UserDropdown from '@/components/user-dropdown';
import { Button, ButtonIcon } from '@mingo/ui';
import Auth from '@/components/auth';
import { IAuthModal } from '@/types/auth';

const Navbar = (): ReactElement => {
  const { data: profile, loading } = useProfile();
  const session = useSession();
  const { setCollapseSidebar, collapseSidebar } = useStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<IAuthModal>(IAuthModal.LOGIN);
  const isLogged = session.status === 'authenticated';
  const balance = Number(profile?.balance);
  const avatar = String(profile?.image);

  const handleCollpaseSidebar = () => setCollapseSidebar(!collapseSidebar);

  const handleLogin = () => setIsOpen(true);

  const handleRegister = () => setIsOpen(true);

  return (
    <div className="w-full h-[65px] bg-base-600 flex justify-between items-center px-4">
      <div className="flex items-center w-full h-full gap-5">
        <ButtonIcon onClick={handleCollpaseSidebar}>
          <FontAwesomeIcon icon={faBars} fontSize={18} width={18} />
        </ButtonIcon>
        <Image src="/images/logo.svg" alt="logo" width={117} height={30} />
      </div>
      <div className="flex items-center justify-end w-full h-full gap-3">
        <Search />

        {!isLogged ? (
          <div className="flex items-center gap-3">
            <Button className="bg-base-500" onClick={handleLogin}>
              Iniciar Sesión
            </Button>
            <Button onClick={handleRegister}>Regístro</Button>
          </div>
        ) : (
          <Deposit amount={balance} isLoading={loading} />
        )}

        <Configuration />
        <Notifications />

        {isLogged && <UserDropdown avatar={avatar} />}
      </div>
      <Auth open={isOpen} setOpen={setIsOpen} type={type} setType={setType} />
    </div>
  );
};

export default Navbar;
