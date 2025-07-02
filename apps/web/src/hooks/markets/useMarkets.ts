import { markets } from '@/data/markets.json';

export const useMarkets = () => {
  return {
    data: markets || [],
    error: null,
    loading: false,
  };
};
