'use client';
import React from 'react';
import SidebarMenu from './SidebarMenu';

interface Item {
  label: string;
  icon: string;
  submenu?: { label: string; icon: string }[];
}

interface SidebarItemProps {
  item: Item;
  isOpen: boolean;
  toggleMenu: (label: string) => void;
}

const SidebarItem = ({ item, isOpen, toggleMenu }: SidebarItemProps): React.ReactElement => {
  const { label, icon, submenu } = item;

  const handleMenu = () => toggleMenu(item.label)

  return (
    <div className="flex flex-col py-3 px-2 rounded-lg text-base-300 w-full cursor-pointer transition-all">
      <div className="flex items-center justify-between" onClick={handleMenu}>
        <div className="flex items-center gap-2">
          <span className={`icon-${icon} text-xl`} />
          <p className="text-base font-semibold">{label}</p>
        </div>
        {submenu && <span className={`icon-chevron-down text-xl`} />}
      </div>

      {submenu && (
        <SidebarMenu
          submenu={submenu}
          isOpen={isOpen}
        />
      )}
    </div>
  );
};

export default SidebarItem;
