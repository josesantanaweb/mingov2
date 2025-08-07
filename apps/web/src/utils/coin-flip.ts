import { CoinTypeEnum } from '@/types/coin-flip';

export const coinAssets = {
  [CoinTypeEnum.HEADS]: {
    image: '/images/mini-games/coin-flip/heads.png',
    name: 'heads',
  },
  [CoinTypeEnum.TAILS]: {
    image: '/images/mini-games/coin-flip/tails.png',
    name: 'tails',
  },
};

export const getCoinImage = (coin: CoinTypeEnum) => coinAssets[coin].image;
export const getCoinName = (coin: CoinTypeEnum) => coinAssets[coin].name;

export const getCoinOutcome = (): CoinTypeEnum =>
  Math.random() < 0.5 ? CoinTypeEnum.HEADS : CoinTypeEnum.TAILS;

export const calculateWinAmount = (
  amount: number,
  multiplier: number
): number => Math.round(amount * multiplier);

export const getMultiplier = (
  base: number,
  bonus: number,
  winStreak: number
): number => base + winStreak * bonus;
