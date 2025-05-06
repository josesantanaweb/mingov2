export type RankingTier = 'gold' | 'silver' | 'bronze' | 'low';

export const getRankingColor = (ranking: number): RankingTier => {
  if (ranking >= 81) return 'gold';
  if (ranking >= 51) return 'silver';
  if (ranking >= 21) return 'bronze';
  return 'low';
};
