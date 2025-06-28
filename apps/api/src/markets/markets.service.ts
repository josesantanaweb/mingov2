import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Market } from './entities/market.entity';

@Injectable()
export class MarketsService {
  constructor(private prisma: PrismaService) {}
  async findAll(): Promise<Market[]> {
    const markets = await this.prisma.market.findMany();
    return markets;
  }
}
