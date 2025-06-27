import { Resolver, Query } from '@nestjs/graphql';
import { MatchsService } from './matchs.service';
import { Match } from './entities/match.entity';

@Resolver()
export class MatchsResolver {
  constructor(private readonly matchsService: MatchsService) {}

  @Query(() => [Match], { name: 'matchs' })
  rooms() {
    return this.matchsService.findAll();
  }
}
