import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Card[]> {
    const cards = await this.prisma.card.findMany();
    return cards;
  }

  async findOne(id: string): Promise<Card> {
    const card = await this.prisma.card.findUnique({
      where: {
        id,
      },
    });

    if (!card) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }

    return card;
  }

  async createCard(): Promise<Card> {
    const numbers = this.generateCardNumbers();

    const card = await this.prisma.card.create({
      data: {
        number: await this.generateUniqueCardNumber(),
        numbers: numbers,
        status: true,
      },
    });

    return card;
  }

  private generateCardNumbers(): number[][] {
    const numbers: number[][] = [];

    for (let col = 0; col < 5; col++) {
      const start = col * 15 + 1;
      const end = start + 14;
      const columnNumbers = this.getRandomNumbersInRange(start, end, 5);

      numbers.push(columnNumbers);
    }

    numbers[2][2] = -1;

    return this.transposeMatrix(numbers);
  }

  private getRandomNumbersInRange(
    start: number,
    end: number,
    count: number,
  ): number[] {
    const range = Array.from({ length: end - start + 1 }, (_, i) => i + start);
    const shuffled = range.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  private transposeMatrix(matrix: number[][]): number[][] {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
  }

  private async generateUniqueCardNumber(): Promise<number> {
    let unique = false;
    let number: number;

    while (!unique) {
      number = Math.floor(Math.random() * 1_000_000);
      const exists = await this.prisma.card.findUnique({
        where: { number },
      });

      if (!exists) {
        unique = true;
      }
    }

    return number;
  }
}
