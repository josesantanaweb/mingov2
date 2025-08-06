'use client';
import React, { useState } from 'react';
import { Button } from '@mingo/components';
import MarketItem from '@/components/bets/market-item';
import SelectAmount from '@/components/bets/select-amount';
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
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const estimatedProfit =
    selectedAmount && marketOption
      ? (selectedAmount * marketOption.odds).toFixed(2)
      : '0.00';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <h3 className="text-xl font-semibold text-white mb-2 text-center">
          Confirmar Apuesta
        </h3>

        <MarketItem market={market} asNavigate={false} />

        <SelectAmount amount={selectedAmount} setAmount={setSelectedAmount}/>

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
