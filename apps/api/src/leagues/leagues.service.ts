import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { League } from './entities/league.entity';

@Injectable()
export class LeaguesService {
  constructor(private prisma: PrismaService) {}
  async findAll(): Promise<League[]> {
    const leagues = await this.prisma.league.findMany({
      include: {
        teams: true,
      },
    });
    return leagues;
  }
}
