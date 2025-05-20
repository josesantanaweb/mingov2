import { ITeam } from '@/types/team';
import { IMarket } from '@/types/market';

export interface IEvent {
  league: string;
  date: string;
  homeTeam: ITeam;
  awayTeam: ITeam;
  markets: IMarket[];
}
