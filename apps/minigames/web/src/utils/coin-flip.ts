import { CoinTypeEnum } from '@/types/common';

export const coinAssets = {
  [CoinTypeEnum.HEADS]: {
    image: '/images/mini-games/coin-flip/heads.png',
    name: 'Cara',
  },
  [CoinTypeEnum.TAILS]: {
    image: '/images/mini-games/coin-flip/tails.png',
    name: 'Sello',
  },
};

export const getCoinImage = (coin: CoinTypeEnum) => coinAssets[coin].image;
export const getCoinName = (coin: CoinTypeEnum) => coinAssets[coin].name;

export const getCoinOutcome = (): CoinTypeEnum =>
  Math.random() < 0.5 ? CoinTypeEnum.HEADS : CoinTypeEnum.TAILS;

export const getMultiplier = (
  base: number,
  bonus: number,
  winStreak: number
): number => base + winStreak * bonus;
