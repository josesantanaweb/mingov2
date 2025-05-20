'use client';
import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { IMarket, IMarketSelected } from '@/types/market';
import MarketButton from './MarketButton';

interface MarketProps {
  market: IMarket;
  handleToggle?: () => void;
  setSelectedMarket: (market: IMarketSelected) => void;
  selectedMarket?: IMarketSelected;
  isOpen: boolean;
}

const Market = ({
  market,
  handleToggle,
  setSelectedMarket,
  selectedMarket,
  isOpen,
}: MarketProps): React.ReactElement => {
  const toggleOpen = useCallback(() => {
    handleToggle?.();
  }, [handleToggle]);

  const handleMarket = (market, option) => {
    setSelectedMarket({
      name: market.name,
      option,
    });
  };

  return (
    <div className="flex flex-col gap-2" role="group" aria-label={market.name}>
      <p className="text-base-300 text-sm">{market.name}</p>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-between w-full gap-3">
          {market.options.map((option, index) => {
            const isSelected = selectedMarket?.option.label === option.label;

            return (
              <MarketButton
                key={market.name + index}
                values={option}
                isSelected={isSelected}
                onClick={() => handleMarket(market, option)}
              />
            );
          })}

          {handleToggle && (
            <button
              onClick={toggleOpen}
              className="bg-base-500 hover:bg-base-400 transition-all cursor-pointer w-10 h-10 shrink-0 rounded-lg flex items-center justify-center text-white"
              aria-expanded={isOpen}
              aria-label={`${isOpen ? 'Close' : 'Open'} additional markets`}
            >
              <FontAwesomeIcon
                icon={faChevronDown}
                fontSize={16}
                width={16}
                className={`transition-all ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Market);
