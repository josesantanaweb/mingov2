import { ITeam } from '@/types/team';

export interface IMatch {
  id: string
  league: string;
  date: string;
  homeTeam: ITeam;
  awayTeam: ITeam;
}
