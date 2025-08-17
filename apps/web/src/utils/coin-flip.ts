import { CoinEnum } from '@/types/coin-flip';

export const coinAssets = {
  [CoinEnum.HEADS]: {
    image: '/images/mini-games/coin-flip/heads.png',
    name: 'heads',
  },
  [CoinEnum.TAILS]: {
    image: '/images/mini-games/coin-flip/tails.png',
    name: 'tails',
  },
};

export const getCoinImage = (coin: CoinEnum) => coinAssets[coin].image;
export const getCoinName = (coin: CoinEnum) => coinAssets[coin].name;

export const getCoinOutcome = (): CoinEnum =>
  Math.random() < 0.5 ? CoinEnum.HEADS : CoinEnum.TAILS;

export const calculateWinAmount = (
  amount: number,
  multiplier: number
): number => Math.round(amount * multiplier);

export const getMultiplier = (
  base: number,
  bonus: number,
  winStreak: number
): number => base + winStreak * bonus;
