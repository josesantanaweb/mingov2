import { Module } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { LeaguesResolver } from './leagues.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [LeaguesResolver, LeaguesService, PrismaService],
})
export class LeaguesModule {}
