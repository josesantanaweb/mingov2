import { Resolver, Query } from '@nestjs/graphql';
import { TeamsService } from './teams.service';
import { Team } from './entities/team.entity';

@Resolver()
export class TeamsResolver {
  constructor(private readonly teamsService: TeamsService) {}

  @Query(() => [Team], { name: 'teams' })
  rooms() {
    return this.teamsService.findAll();
  }
}
