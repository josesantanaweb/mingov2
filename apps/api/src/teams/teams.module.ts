import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { PrismaService } from '../prisma/prisma.service';
import { TeamsResolver } from './teams.resolver';

@Module({
  providers: [TeamsResolver, TeamsService, PrismaService],
})
export class TeamsModule {}
