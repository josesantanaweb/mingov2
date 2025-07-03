import { Resolver, Query } from '@nestjs/graphql';
import { MarketOptionsService } from './market-options.service';
import { MarketOption } from './entities/market-option.entity';

@Resolver()
export class MarketOptionsResolver {
  constructor(private readonly marketOptionsService: MarketOptionsService) {}

  @Query(() => [MarketOption], { name: 'marketOptions' })
  marketOptions() {
    return this.marketOptionsService.findAll();
  }
}
