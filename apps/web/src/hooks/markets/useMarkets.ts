import { markets } from '@/data/markets.json';

export const useMarkets = (matchId: string) => {
  return {
    data: markets.filter(market => market.matchId === matchId) || null,
    error: null,
    loading: false,
  };
};
