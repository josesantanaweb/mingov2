'use client';
import React, { useState } from 'react';
import { Button } from '@mingo/ui';
import MarketItem from '@/components/bets/market-item';
import AmountInput from '@/components/bets/amount-input/AmountInput';
import AmountButton from '@/components/bets/amount-button/AmountButton';
import { IMarket, IMarketOption } from '@/types/market';
import Modal from '../Modal';

interface ConfirmBetProps {
  isOpen?: boolean;
  onClose?: () => void;
  market: IMarket;
  marketOption: IMarketOption;
}

const ConfirmBet = ({
  isOpen = false,
  onClose,
  market,
  marketOption,
}: ConfirmBetProps): React.ReactElement => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const predefinedAmounts = [10, 20, 50, 100];
  const estimatedProfit =
    selectedAmount && marketOption
      ? (selectedAmount * marketOption.odds).toFixed(2)
      : '0.00';

  const handleAmountSelect = (amount: number) => setSelectedAmount(amount);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <h3 className="text-xl font-semibold text-white mb-2 text-center">
          Confirmar Apuesta
        </h3>

        <MarketItem market={market} asNavigate={false} />

        <div className="flex flex-col gap-2">
          <AmountInput
            value={selectedAmount || 0}
            onChange={setSelectedAmount}
            maxValue={1000}
            placeholder="0"
            variant="modal"
          />
          <div className="grid grid-cols-4 items-center gap-3">
            {predefinedAmounts.map(amount => (
              <AmountButton
                key={amount}
                amount={amount}
                isSelected={selectedAmount === amount}
                onClick={handleAmountSelect}
                variant="modal"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="text-base-300 text-base">Cuota:</p>
            <p className="text-white text-base font-semibold">
              {marketOption ? marketOption.odds : '0.00'}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-base-300 text-base">Importe:</p>
            <p className="text-white text-base font-semibold">
              {selectedAmount?.toFixed(2) || '0.00'} VES
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-base-300 text-base">Ganancia estimada:</p>
            <p className="text-white text-base font-semibold">
              {estimatedProfit || '0.00'} VES
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button isFull onClick={onClose} className="bg-base-700">
            Cancelar
          </Button>
          <Button
            variant="primary"
            isFull
            disabled={!selectedAmount || selectedAmount === 0}
          >
            Aceptar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmBet;
