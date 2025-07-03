import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MarketOption } from './entities/market-option.entity';

@Injectable()
export class MarketOptionsService {
  constructor(private prisma: PrismaService) {}
  async findAll(): Promise<MarketOption[]> {
    const marketOptions = await this.prisma.marketOption.findMany();
    return marketOptions;
  }
}
