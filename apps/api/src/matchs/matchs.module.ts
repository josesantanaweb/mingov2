import { Module } from '@nestjs/common';
import { MatchsService } from './matchs.service';
import { MatchsResolver } from './matchs.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [MatchsResolver, MatchsService, PrismaService],
})
export class MatchsModule {}
