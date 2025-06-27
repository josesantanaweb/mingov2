import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Match } from './entities/match.entity';

@Injectable()
export class MatchsService {
  constructor(private prisma: PrismaService) {}
  async findAll(): Promise<Match[]> {
    const matchs = await this.prisma.match.findMany({
      include: {
        homeTeam: true,
        awayTeam: true,
      },
    });
    return matchs;
  }
}
