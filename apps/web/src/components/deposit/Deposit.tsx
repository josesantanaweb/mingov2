'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ButtonIcon } from '@mingo/ui';
import { faAdd, faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface DepositProps {
  amount: number;
  isLoading?: boolean;
}

const Deposit = ({ amount, isLoading }: DepositProps): ReactElement => {
  if (isLoading) {
    return (
      <div className="rounded-lg border-2 w-[200px] h-[40px] border-base-500 flex items-center justify-between p-1 animate-pulse">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 bg-base-500 rounded-full" />
          <div className="w-16 h-4 bg-base-500 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border w-[180px] h-[px] border-base-500 flex items-center justify-between p-0.5">
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 bg-base-700 ml-0.5 rounded-full font-semibold text-xs text-white flex justify-center items-center">
          V
        </span>
        <div className="flex items-center gap-2 text-white">
          <h4 className="uppercase text-sm font-semibold">{amount || 0} VES</h4>
          <button
            className="cursor-pointer"
            aria-label="Abrir menú"
            type="button"
          >
            <FontAwesomeIcon icon={faChevronDown} fontSize={12} width={12} />
          </button>
        </div>
      </div>
      <ButtonIcon
        onClick={() => ({})}
        size="md"
        variant="primary"
        aria-label="Agregar depósito"
      >
        <FontAwesomeIcon icon={faAdd} fontSize={14} width={14} />
      </ButtonIcon>
    </div>
  );
};

export default Deposit;
