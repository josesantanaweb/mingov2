import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomCronService } from './rooms-cron.service';
import { PrismaService } from '../prisma/prisma.service';
import { CardsService } from '../cards/cards.service';
import { RoomsResolver } from './rooms.resolver';
import { PubSub } from 'graphql-subscriptions';

@Module({
  providers: [
    RoomsResolver,
    RoomsService,
    PrismaService,
    CardsService,
    RoomCronService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: [RoomsService],
})
export class RoomsModule {}
