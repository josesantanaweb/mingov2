'use client';
import React from 'react';

interface FooterItemProps {
  name: string;
  icon: string;
}

const FooterItem = ({ name, icon }: FooterItemProps): React.ReactElement => {
  return (
    <button
      type="button"
      className="w-16 flex flex-col items-center justify-center text-base-300 h-full"
    >
      <span className={`icon-${icon} text-xl`} />
      <p className="text-xs capitalize">{name}</p>
    </button>
  );
};

export default FooterItem;
