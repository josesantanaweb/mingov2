import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Card } from '../../cards/entities/card.entity';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class Room {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  award: number;

  @Field()
  price: number;

  @Field()
  status: boolean;

  @Field(() => GraphQLJSON)
  drawnNumbers: any;

  @Field(() => GraphQLISODateTime)
  time: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;

  @Field(() => User, { nullable: true })
  winnerUser?: User;

  @Field(() => Card, { nullable: true })
  winnerCard?: Card;

  @Field(() => [User], { nullable: 'itemsAndList' })
  users?: User[];

  @Field(() => [Card], { nullable: 'itemsAndList' })
  cards?: Card[];

  @Field(() => [Card])
  userCards?: Card[];
}

@ObjectType()
export class RoomStarted {
  @Field()
  roomId: string;

  @Field()
  message: string;
}

@ObjectType()
export class RoomWinner {
  @Field()
  roomId: string;

  @Field(() => User)
  winnerUser: User;

  @Field(() => Card)
  winnerCard: Card;
}
