import { Module } from '@nestjs/common';
import { BetsService } from './bets.service';
import { BetsResolver } from './bets.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [BetsResolver, BetsService, PrismaService],
})
export class BetsModule {}
