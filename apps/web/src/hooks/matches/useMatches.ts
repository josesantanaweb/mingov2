import { matches } from '@/data/matches.json';

export const useMatches = () => {
  return {
    data: matches || [],
    error: null,
    loading: false,
  };
};
