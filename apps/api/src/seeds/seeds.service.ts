/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { loadJson } from '../utils/loadJson';

@Injectable()
export class SeedsService {
  constructor(private readonly prisma: PrismaService) {}

  async executeSeed(): Promise<boolean> {
    await this.deleteDatabase();

    try {
      await this.seedLeagues();
      await this.seedTeams();
      await this.seedSports();
      await this.seedMarkets();
    } catch (error) {
      console.error('Error al ejecutar seeds:', error);
      throw error;
    }

    return true;
  }

  private async deleteDatabase(): Promise<void> {
    await this.prisma.match.deleteMany({});
    await this.prisma.team.deleteMany({});
    await this.prisma.league.deleteMany({});
    await this.prisma.market.deleteMany({});
    await this.prisma.sport.deleteMany({});
  }

  async seedLeagues() {
    const leagues = loadJson<any[]>('leagues.json');
    for (const league of leagues) {
      await this.prisma.league.create({ data: league });
    }
  }

  async seedTeams() {
    const teams = loadJson<any[]>('teams.json');
    for (const team of teams) {
      await this.prisma.team.create({ data: team });
    }
  }

  async seedSports() {
    const sports = loadJson<any[]>('sports.json');
    for (const sport of sports) {
      await this.prisma.sport.create({ data: sport });
    }
  }

  async seedMarkets() {
    const markets = loadJson<any[]>('markets.json');
    for (const market of markets) {
      await this.prisma.market.create({ data: market });
    }
  }
}
