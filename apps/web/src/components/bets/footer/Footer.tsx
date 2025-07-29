'use client';
import React, { useState } from 'react';
import FooterItem from './FooterItem';
import Sidebar from '@/components/bets/sidebar'

const Footer = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="flex items-center justify-between bg-base-800 h-[60px] fixed bottom-0 left-1/2 -translate-x-1/2 w-full md:max-w-md z-20">
        <FooterItem name="menu" icon="menu" onClick={handleSidebar} isMenu />
        <FooterItem name="deportes" icon="soccer" />
        <FooterItem name="" icon="challenge" isMain />
        <FooterItem name="ranking" icon="ranking" />
        <FooterItem name="profile" icon="user" />
      </div>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Footer;
