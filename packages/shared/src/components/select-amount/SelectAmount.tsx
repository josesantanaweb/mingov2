'use client';
import React from 'react';
import AmountInput from '../amount-input';
import AmountButton from '../amount-button';

interface SelectAmountProps {
  amount: number;
  setAmount: (amount: number) => void;
}

const SelectAmount = ({
  amount,
  setAmount,
}: SelectAmountProps): React.ReactElement => {
  const predefinedAmounts = [10, 20, 50, 100];

  const handleAmountSelect = (amount: number) => setAmount(amount);

  return (
    <div className="flex flex-col gap-2">
      <AmountInput
        value={amount || 0}
        onChange={setAmount}
        maxValue={1000}
        placeholder="0"
        variant="modal"
      />
      <div className="grid grid-cols-4 items-center gap-3">
        {predefinedAmounts.map(predefinedAmount => (
          <AmountButton
            key={predefinedAmount}
            amount={predefinedAmount}
            isSelected={amount === predefinedAmount}
            onClick={handleAmountSelect}
            variant="modal"
          />
        ))}
      </div>
    </div>
  );
};

export default SelectAmount;
