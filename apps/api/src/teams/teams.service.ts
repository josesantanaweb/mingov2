import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}
  async findAll(): Promise<Team[]> {
    const teams = await this.prisma.team.findMany();
    return teams;
  }
}
