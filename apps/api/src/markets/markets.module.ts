import { Module } from '@nestjs/common';
import { MarketsService } from './markets.service';
import { MarketsResolver } from './markets.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [MarketsResolver, MarketsService, PrismaService],
})
export class MarketsModule {}
