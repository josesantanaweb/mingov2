import { markets } from '@/data/markets.json';

export const useMarket = (id: string) => {
  const market = markets.find(market => market.id === id);

  return {
    data: market || null,
    error: market ? null : new Error(`Market with id ${id} not found`),
    loading: false,
  };
};
