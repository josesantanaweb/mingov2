'use client';
import React from 'react';
import FooterItem from './FooterItem';

const Footer = (): React.ReactElement => {
  return (
    <div className="flex items-center justify-between bg-base-800 h-[60px] fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md">
      <FooterItem name="menu" icon="menu" />
      <FooterItem name="historial" icon="history" />
      <FooterItem name="" icon="soccer" isMain />
      <FooterItem name="ranking" icon="ranking" />
      <FooterItem name="profile" icon="user" />
    </div>
  );
};

export default Footer;
