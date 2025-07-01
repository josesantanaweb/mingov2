import { Resolver, Query } from '@nestjs/graphql';
import { MatchesService } from './matches.service';
import { Match } from './entities/match.entity';

@Resolver()
export class MatchesResolver {
  constructor(private readonly matchesService: MatchesService) {}

  @Query(() => [Match], { name: 'matches' })
  rooms() {
    return this.matchesService.findAll();
  }
}
