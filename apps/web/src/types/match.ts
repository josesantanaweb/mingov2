import { ITeam } from '@/types/team';

export interface IMatch {
  league: string;
  date: string;
  homeTeam: ITeam;
  awayTeam: ITeam;
}
