import { Resolver } from '@nestjs/graphql';
import { LeaguesService } from './leagues.service';

@Resolver()
export class LeaguesResolver {
  constructor(private readonly leaguesService: LeaguesService) {}
}
