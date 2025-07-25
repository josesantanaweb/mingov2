import { CoinTypeEnum } from '@/types/coin-flip';

export const coinAssets = {
  [CoinTypeEnum.GOLD]: {
    image: '/images/mini-games/coin-flip/gold-coin.png',
    name: 'Cara (Oro)',
  },
  [CoinTypeEnum.SILVER]: {
    image: '/images/mini-games/coin-flip/silver-coin.png',
    name: 'Cruz (Plata)',
  },
};

export const getCoinImage = (coin: CoinTypeEnum) => coinAssets[coin].image;
export const getCoinName = (coin: CoinTypeEnum) => coinAssets[coin].name;

export const getCoinOutcome = (): CoinTypeEnum =>
  Math.random() < 0.5 ? CoinTypeEnum.GOLD : CoinTypeEnum.SILVER;

export const calculateWinAmount = (
  amount: number,
  multiplier: number
): number => Math.round(amount * multiplier);

export const getMultiplier = (
  base: number,
  bonus: number,
  winStreak: number
): number => base + winStreak * bonus;
