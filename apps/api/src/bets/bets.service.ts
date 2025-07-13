import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Bet } from './entities/bet.entity';
import { CreateBetInput } from './input/bets.input';

@Injectable()
export class BetsService {
  constructor(private prisma: PrismaService) {}
  async findAll(): Promise<Bet[]> {
    const bets = await this.prisma.bet.findMany({
      include: {
        market: {
          include: {
            marketType: true,
          },
        },
        match: {
          include: {
            homeTeam: true,
            awayTeam: true,
            league: true,
          },
        },
        marketOption: true,
        user: true,
      },
    });

    return bets;
  }

  async create(data: CreateBetInput): Promise<Bet> {
    const bet = await this.prisma.bet.create({
      data,
      include: {
        market: {
          include: {
            marketType: true,
          },
        },
        match: {
          include: {
            homeTeam: true,
            awayTeam: true,
            league: true,
          },
        },
        marketOption: true,
        user: true,
      },
    });

    return bet;
  }
}
