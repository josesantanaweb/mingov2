// src/room/room-cron.service.ts
import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RoomsService } from './rooms.service';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class RoomCronService implements OnModuleInit {
  constructor(
    private readonly roomService: RoomsService,
    @Inject('PUB_SUB')
    private readonly pubSub: PubSub,
  ) {}

  async onModuleInit() {
    await this.checkRoomsToStart();
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async checkRoomsToStart() {
    console.log('🕐 Cronjob ejecutado');
    const now = new Date();

    const roomsToStart = await this.roomService.getRoomsToStart(now);

    console.log(`Hay ${roomsToStart.length} salas para iniciar.`);

    for (const room of roomsToStart) {
      await this.pubSub.publish('ROOM_STARTED', {
        roomStarted: {
          roomId: room.id,
          message: 'La sala ha comenzado',
        },
      });

      await this.roomService.markRoomAsStarted(room.id);
    }
  }
}
