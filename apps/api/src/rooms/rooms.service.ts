import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CardsService } from '../cards/cards.service';
import { AddUserToRoomInput, CreateRoomInput } from './input/rooms.inputs';
import { Room } from './entities/room.entity';
import { User } from '../users/entities/user.entity';
import { Card } from '../cards/entities/card.entity';
import { pubSub } from '../common/pubsub';

@Injectable()
export class RoomsService {
  private pubSub = pubSub;
  constructor(
    private prisma: PrismaService,
    private cardsService: CardsService,
  ) {}

  async findAll(): Promise<Room[]> {
    const rooms = await this.prisma.room.findMany({
      include: {
        winnerUser: true,
        winnerCard: true,
      },
    });
    return rooms;
  }

  async findOne(id: string): Promise<Room> {
    const room = await this.prisma.room.findUnique({
      where: {
        id,
      },
      include: {
        winnerUser: true,
        winnerCard: true,
      },
    });

    if (!room) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }

    return room;
  }

  async findUsersInRoom(roomId: string): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        rooms: {
          some: { roomId },
        },
      },
    });

    return users;
  }

  async findCardsInRoom(roomId: string): Promise<Card[]> {
    const cardsOnRoomsUsers = await this.prisma.cardsOnRoomsUsers.findMany({
      where: { roomId },
      include: { card: true },
    });

    return cardsOnRoomsUsers.map(relation => relation.card);
  }

  async findUserCardsInRoom(userId: string, roomId: string): Promise<Card[]> {
    const cardsOnRoomsUsers = await this.prisma.cardsOnRoomsUsers.findMany({
      where: {
        roomId,
        userId,
      },
      include: {
        card: true,
      },
    });

    return cardsOnRoomsUsers.map(relation => relation.card);
  }

  async createRoom(data: CreateRoomInput): Promise<Room> {
    const room = await this.prisma.room.create({
      data: {
        ...data,
        time: new Date(Date.now() + 30 * 60 * 1000),
      },
    });

    return room;
  }

  async addUserToRoom(input: AddUserToRoomInput): Promise<string> {
    const { userId, roomId, numberOfCards } = input;
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
    });
    if (!room) throw new NotFoundException(`Room with id ${roomId} not found`);

    const existingRelation = await this.prisma.roomsOnUsers.findUnique({
      where: {
        userId_roomId: { userId, roomId },
      },
    });

    if (!existingRelation) {
      await this.prisma.roomsOnUsers.create({
        data: {
          userId,
          roomId,
        },
      });
    }

    for (let i = 0; i < numberOfCards; i++) {
      const card = await this.cardsService.createCard();

      await this.prisma.cardsOnRoomsUsers.create({
        data: {
          userId,
          roomId,
          cardId: card.id,
        },
      });
    }

    return 'User added to room';
  }

  async getRoomsToStart(now: Date) {
    return this.prisma.room.findMany({
      where: {
        time: { lte: now },
        started: false,
      },
    });
  }

  async markRoomAsStarted(roomId: string) {
    return this.prisma.room.update({
      where: { id: roomId },
      data: { started: true },
    });
  }

  async validateWinner(roomId: string): Promise<
    | {
        message: 'We have a winner!';
        winner: {
          userId: string;
          cardId: string;
        };
      }
    | { message: 'No winner yet.' }
  > {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      include: {
        cards: {
          include: {
            card: true,
            user: true,
          },
        },
      },
    });

    if (!room) {
      throw new NotFoundException(`Room with id ${roomId} not found`);
    }

    if (!room.drawnNumbers || !room.drawnNumbers.length) {
      throw new Error('No numbers have been drawn yet.');
    }

    const drawn = room.drawnNumbers as number[];

    for (const cardOnRoom of room.cards) {
      const cardNumbers = cardOnRoom.card.numbers as number[];

      const flattened = cardNumbers.flat();
      const isWinner = flattened.every(n => n === -1 || drawn.includes(n));

      if (isWinner) {
        await this.prisma.card.update({
          where: { id: cardOnRoom.card.id },
          data: { status: true },
        });

        const updatedRoom = await this.prisma.room.update({
          where: { id: roomId },
          data: {
            winnerUserId: cardOnRoom.userId,
            winnerCardId: cardOnRoom.cardId,
            status: false,
          },
          include: {
            winnerUser: true,
            winnerCard: true,
          },
        });

        await this.pubSub.publish('ROOM_WINNER', {
          roomWinner: {
            roomId: updatedRoom.id,
            winnerUser: updatedRoom.winnerUser,
            winnerCard: updatedRoom.winnerCard,
          },
        });

        return {
          message: 'We have a winner!',
          winner: {
            userId: cardOnRoom.userId,
            cardId: cardOnRoom.cardId,
          },
        };
      }
    }

    return {
      message: 'No winner yet.',
    };
  }

  async announceNumber(roomId: string): Promise<number | null> {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      select: { drawnNumbers: true },
    });

    const drawnNumbers: number[] = room?.drawnNumbers || [];
    const availableNumbers = Array.from({ length: 75 }, (_, i) => i + 1).filter(
      n => !drawnNumbers.includes(n),
    );

    if (availableNumbers.length === 0) {
      await this.validateWinner(roomId);
      return null;
    }

    const randomNumber =
      availableNumbers[Math.floor(Math.random() * availableNumbers.length)];

    await this.prisma.room.update({
      where: { id: roomId },
      data: {
        drawnNumbers: { push: randomNumber },
      },
    });

    await this.validateWinner(roomId);

    return randomNumber;
  }
}
