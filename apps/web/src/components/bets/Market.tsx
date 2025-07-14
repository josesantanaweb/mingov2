'use client';
import React, { useState } from 'react';
import { Button } from '@mingo/ui';
import { useParams } from 'next/navigation';
import { useMarket } from '@/hooks/markets/useMarket';
import MatchWrapper from '@/components/bets/match-wrapper';
import MarketOption from '@/components/bets/market-option';
import ConfirmBet from '@/components/bets/modals/confim-bet/ConfirmBet';
import { IMarketOption } from '@/types/market';

const Market = (): React.ReactElement => {
  const [marketOption, setMarketOption] = useState<IMarketOption | null>(null);
  const { marketId } = useParams<{ marketId: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const { data: market } = useMarket(marketId);
  const betSummary = { amount: 300, label: 'Total apostado en este mercado:' };

  const handleOptionSelect = (option: IMarketOption) => setMarketOption(option);

  const handleOpenModal = () => setIsOpen(true);

  const handleCloseModal = () => setIsOpen(false);

  return (
    <MatchWrapper betSummary={betSummary} pageType="MARKET">
      <div className="flex flex-col items-start w-full gap-6 pb-20">
        <div className="flex flex-col">
          <h6 className="text-base font-medium text-white">
            {market?.marketType?.name}
          </h6>
          <p className="text-sm font-medium text-base-300">
            {market?.marketType?.description}
          </p>
        </div>
        <div className="flex flex-col gap-[40px] w-full">
          <div className="grid items-center justify-between w-full grid-cols-3 gap-5">
            {market?.marketOptions.map(option => (
              <MarketOption
                key={option.id}
                option={option}
                onClick={handleOptionSelect}
                isActive={marketOption?.id === option.id}
              />
            ))}
          </div>
          <div className="flex flex-col w-full gap-3">
            <Button
              size="full"
              variant="primary"
              onClick={handleOpenModal}
              disabled={!marketOption}
            >
              Crear Reto
            </Button>
          </div>
        </div>
      </div>
      <ConfirmBet
        isOpen={isOpen}
        onClose={handleCloseModal}
        market={market}
        marketOption={marketOption}
      />
    </MatchWrapper>
  );
};

export default Market;
