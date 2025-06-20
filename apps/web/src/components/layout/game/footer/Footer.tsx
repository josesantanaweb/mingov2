'use client';
import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

const GameFooter = (): React.ReactElement => {
  return (
    <div className="flex justify-between items-center py-5 px-8 border-t border-base-500">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 text-base-300 cursor-pointer">
          <span className="icon-star text-2xl"></span>
          <p className="text-base">12</p>
        </div>
        <div className="flex items-center gap-2 text-base-300 cursor-pointer">
          <span className="icon-heart text-2xl"></span>
          <p className="text-base">20</p>
        </div>
        <span className="icon-shared text-2xl text-base-300"></span>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src="/images/logo-saturated.png"
          alt="logo"
          width={117}
          height={30}
        />
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 text-base-300">
          <span className="icon-volumen text-2xl"></span>
          <span className="icon-sound text-2xl"></span>
          <FontAwesomeIcon icon={faCircleQuestion} fontSize={20} width={20} />
        </div>
      </div>
    </div>
  );
};

export default GameFooter;
