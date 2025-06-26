'use client';
import React from 'react';
import FooterItem from './FooterItem';

const Footer = (): React.ReactElement => {
  return (
    <div className="flex items-center justify-between bg-base-800 h-[60px] fixed bottom-0 left-0 w-full">
      <FooterItem name="menu" icon="menu" />
      <FooterItem name="historial" icon="history" />
      <button
        type="button"
        className="flex h-full flex-col items-center justify-center text-white relative"
      >
        <div className="bg-primary-600 w-12 h-12 rounded-xl absolute rotate-45 -top-6 flex items-center justify-center">
          <span className="icon-soccer text-xl"></span>
        </div>
      </button>
      <FooterItem name="ranking" icon="ranking" />
      <FooterItem name="profile" icon="user" />
    </div>
  );
};

export default Footer;
