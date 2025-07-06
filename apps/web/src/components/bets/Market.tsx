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
  const [marketOption, setMarketOption] = useState<IMarketOption | null>(
    null,
  );
  const { marketId } = useParams<{ marketId: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const { data: market } = useMarket(marketId);

  const handleOptionSelect = (option: IMarketOption) =>
    setMarketOption(option);

  const handleOpenModal = () => setIsOpen(true);

  const handleCloseModal = () => setIsOpen(false);

  return (
    <MatchWrapper>
      <div className="flex items-start flex-col gap-6 w-full pb-20">
        <div className="flex flex-col">
          <h6 className="text-base font-medium text-white">
            {market?.marketType?.name}
          </h6>
          <p className="text-base-300 font-medium text-sm">
            {market?.marketType?.description}
          </p>
        </div>
        <div className="flex flex-col gap-[100px] w-full">
          <div className="grid grid-cols-3 items-center justify-between w-full gap-5">
            {market?.marketOptions.map(option => (
              <MarketOption
                key={option.id}
                option={option}
                onClick={handleOptionSelect}
                isActive={marketOption?.id === option.id}
              />
            ))}
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Button size="full" variant="primary" onClick={handleOpenModal} disabled={!marketOption}>
              Confirmar
            </Button>
            <Button size="full" variant="default">
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
