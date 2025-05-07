'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointUp } from '@fortawesome/free-solid-svg-icons';

import AmountBox from '@/components/amount-box';
import { Button } from '@mingo/ui';

interface CurrentBalanceProps {
  balance: number;
}

const CurrentBalance = ({ balance }: CurrentBalanceProps) => {
  return (
    <div className="flex flex-col">
      <h5 className="mb-1 text-xs font-semibold text-base-300">Saldo Actual</h5>
      <AmountBox amount={balance} />
      <Button className="uppercase">
        <FontAwesomeIcon
          icon={faHandPointUp}
          className="mr-2"
          fontSize={16}
          width={16}
        />
        Automarcar
      </Button>
    </div>
  );
};

export default CurrentBalance;
