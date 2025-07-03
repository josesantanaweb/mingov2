import { Module } from '@nestjs/common';
import { MarketTypesService } from './market-types.service';
import { MarketTypesResolver } from './market-types.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [MarketTypesResolver, MarketTypesService, PrismaService],
})
export class MarketTypesModule {}
