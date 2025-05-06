import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
  Subscription,
} from '@nestjs/graphql';
import { Room, RoomStarted, RoomWinner } from './entities/room.entity';
import { User } from '../users/entities/user.entity';
import { Card } from '../cards/entities/card.entity';
import { AddUserToRoomInput, CreateRoomInput } from './input/rooms.inputs';
import { RoomsService } from './rooms.service';
import { pubSub } from '../common/pubsub';
@Resolver(() => Room)
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}
  private pubSub = pubSub;

  @Query(() => [Room], { name: 'rooms' })
  rooms() {
    return this.roomsService.findAll();
  }

  @Query(() => Room, { name: 'room' })
  room(@Args('id', { type: () => String }) id: string) {
    return this.roomsService.findOne(id);
  }

  @ResolveField(() => [User], { name: 'users' })
  roomUsers(@Parent() room: Room): Promise<User[]> {
    const { id } = room;
    return this.roomsService.findUsersInRoom(id);
  }

  @ResolveField(() => [Card], { name: 'cards' })
  roomCards(@Parent() room: Room): Promise<Card[]> {
    const { id } = room;
    return this.roomsService.findCardsInRoom(id);
  }

  @ResolveField(() => [Card], { name: 'userCards' })
  roomUserCards(
    @Args('userId', { type: () => String }) userId: string,
    @Parent() room: Room,
  ): Promise<Card[]> {
    return this.roomsService.findUserCardsInRoom(userId, room.id);
  }

  @Mutation(() => Room, { name: 'createRoom' })
  createRoom(
    @Args('input', { type: () => CreateRoomInput })
    input: CreateRoomInput,
  ): Promise<Room> {
    return this.roomsService.createRoom(input);
  }

  @Mutation(() => String, { name: 'addUserToRoom' })
  addUserToRoom(
    @Args('input', { type: () => AddUserToRoomInput })
    input: AddUserToRoomInput,
  ): Promise<string> {
    return this.roomsService.addUserToRoom(input);
  }

  @Mutation(() => Number, { nullable: true })
  async announceNumber(@Args('roomId', { type: () => String }) roomId: string) {
    const number = await this.roomsService.announceNumber(roomId);

    if (number !== null) {
      this.pubSub.publish('ANNOUNCE_NUMBER', {
        announceNumber: number,
      });
    }

    return number;
  }

  @Subscription(() => Number, {
    name: 'announceNumber',
  })
  announceNumberSub() {
    return this.pubSub.asyncIterableIterator('ANNOUNCE_NUMBER');
  }

  @Subscription(() => RoomStarted, {
    name: 'roomStarted',
    filter: (payload, variables) => {
      return payload.roomStarted.roomId === variables.roomId;
    },
  })
  roomStarted(@Args('roomId') roomId: string) {
    console.log(`Suscripción a roomId: ${roomId}`);
    return this.pubSub.asyncIterableIterator('ROOM_STARTED');
  }

  @Subscription(() => RoomWinner, {
    name: 'roomWinner',
    filter: (payload, variables) =>
      payload.roomWinner.roomId === variables.roomId,
  })
  roomWinner(@Args('roomId') roomId: string) {
    console.log(`Suscripción a roomId: ${roomId}`);
    return this.pubSub.asyncIterableIterator('ROOM_WINNER');
  }
}
