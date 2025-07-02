'use client';
import React from 'react';
import { Button } from '@mingo/ui';
import { useParams } from 'next/navigation';
import { useMarket } from '@/hooks/markets/useMarket';
import MatchWrapper from '@/components/bets/match-wrapper';
import MarketOption from '@/components/bets/market-option';

const Market = (): React.ReactElement => {
  const { marketId } = useParams<{ marketId: string }>();
  const { data: market } = useMarket(marketId);
  return (
    <MatchWrapper>
      <div className="flex items-start flex-col gap-3 w-full">
        <div className="flex flex-col">
          <h6 className="text-base font-medium text-white">{market.name}</h6>
          <p className="text-base-300 font-medium text-sm">
            {market.description}
          </p>
        </div>
        <div className="flex flex-col gap-[100px] w-full">
          <div className="flex items-center justify-between w-full gap-5">
            <MarketOption
              isActive
              option={{
                id: '1',
                name: 'AC Milan',
                odds: 1.75,
              }}
            />
            <MarketOption
              option={{
                id: '2',
                name: 'Empate',
                odds: 1.75,
              }}
            />
            <MarketOption
              option={{
                id: '3',
                name: 'Nápoles',
                odds: 1.75,
              }}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Button size="full" variant="primary">
              Confirmar
            </Button>
            <Button size="full" variant="default">
              Crear Reto
            </Button>
          </div>
        </div>
      </div>
    </MatchWrapper>
  );
};

export default Market;
