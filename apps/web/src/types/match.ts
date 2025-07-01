import { ITeam } from '@/types/team';
import { ILeague } from './league';

export interface IMatch {
  id: string
  league: ILeague;
  dateAt: string;
  homeTeam: ITeam;
  awayTeam: ITeam;
  isLive: boolean;
  totalAmount: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}