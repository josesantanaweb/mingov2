import { Resolver, Query } from '@nestjs/graphql';
import { MarketsService } from './markets.service';
import { Market } from './entities/market.entity';

@Resolver()
export class MarketsResolver {
  constructor(private readonly marketsService: MarketsService) {}

  @Query(() => [Market], { name: 'markets' })
  rooms() {
    return this.marketsService.findAll();
  }
}
