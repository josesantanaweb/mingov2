import { matches } from '@/data/matches.json';

export const useMatch = (id: string) => {
  const match = matches.find(match => match.id === id);

  return {
    data: match || null,
    error: match ? null : new Error(`Match with id ${id} not found`),
    loading: false,
  };
};
