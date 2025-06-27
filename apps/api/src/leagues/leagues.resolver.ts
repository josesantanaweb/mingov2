import { Resolver, Query } from '@nestjs/graphql';
import { LeaguesService } from './leagues.service';
import { League } from './entities/league.entity';

@Resolver()
export class LeaguesResolver {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Query(() => [League], { name: 'leagues' })
  rooms() {
    return this.leaguesService.findAll();
  }
}
