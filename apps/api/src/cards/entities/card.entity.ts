import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class Card {
  @Field(() => ID)
  id: string;

  @Field()
  number: number;

  @Field(() => GraphQLJSON)
  numbers: any;

  @Field()
  status: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;
}
