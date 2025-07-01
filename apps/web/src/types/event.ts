import { ITeam } from '@/types/team';
import { IMarketSport } from '@/types/market';

export interface IEvent {
  league: string;
  date: string;
  homeTeam: ITeam;
  awayTeam: ITeam;
  markets: IMarketSport[];
}
