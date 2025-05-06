import type { IUser } from './user';
import type { ICard } from './card';

export interface IRoom {
  id: string;
  name: string;
  award: number;
  price: number;
  time: Date;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
  winnerUser?: IUser;
  winnerCard?: ICard;
  users?: IUser[];
  cards?: ICard[];
  userCards?: ICard[];
}
