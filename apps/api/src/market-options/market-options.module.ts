import { Module } from '@nestjs/common';
import { MarketOptionsService } from './market-options.service';
import { MarketOptionsResolver } from './market-options.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [MarketOptionsResolver, MarketOptionsService, PrismaService],
})
export class MarketOptionsModule {}
