import { Resolver } from '@nestjs/graphql';
import { MarketTypesService } from './market-types.service';

@Resolver()
export class MarketTypesResolver {
  constructor(private readonly marketTypesService: MarketTypesService) {}
}
