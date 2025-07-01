import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Match } from './entities/match.entity';

@Injectable()
export class MatchesService {
  constructor(private prisma: PrismaService) {}
  async findAll(): Promise<Match[]> {
    const matches = await this.prisma.match.findMany({
      include: {
        homeTeam: true,
        awayTeam: true,
        league: true,
      },
    });
    return matches;
  }
}
