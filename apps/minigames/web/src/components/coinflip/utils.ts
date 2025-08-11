import { CoinTypeEnum } from '@/types/common';
import { ResultEnum } from '../../types/common';
import { ASSETS } from '@/constants';

export const coinAssets = {
  [CoinTypeEnum.HEADS]: {
    image: ASSETS.IMAGES.COIN_FLIP.HEADS,
    name: 'Cara',
  },
  [CoinTypeEnum.TAILS]: {
    image: ASSETS.IMAGES.COIN_FLIP.TAILS,
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
  winStreak: number,
): number => base + winStreak * bonus;

export const getMultiplierColor = (result: ResultEnum): string => {
  switch (result) {
    case ResultEnum.WIN:
      return 'text-green-500';
    case ResultEnum.LOSE:
      return 'text-red-500';
    default:
      return 'text-base-300';
  }
};
