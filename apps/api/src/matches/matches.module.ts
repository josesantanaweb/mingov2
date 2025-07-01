import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesResolver } from './matches.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [MatchesResolver, MatchesService, PrismaService],
})
export class MatchesModule {}
