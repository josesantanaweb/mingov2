'use client';
import React, { useState } from 'react';
import clsx from 'clsx';

import { ROUTES } from '@/constants/routes';
import { useStore } from '@/store';

import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const { collapseSidebar } = useStore();
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

  const toggleDropdown = (label: string) => {
    setOpenDropdowns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  return (
    <div
      className={clsx(
        'w-full bg-base-600 h-full transition-all',
        collapseSidebar ? 'max-w-[80px]' : 'max-w-[260px]',
      )}
    >
      <div className="flex flex-col py-6 justify-center items-center">
        <div className="flex flex-col w-full items-center">
          {ROUTES.map(item => (
            <SidebarItem
              key={item.label}
              item={item}
              isOpen={openDropdowns.has(item.label)}
              toggleDropdown={toggleDropdown}
              isCollapse={collapseSidebar}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
