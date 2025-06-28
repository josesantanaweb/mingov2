import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class Bet {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  amount: number;

  @Field()
  odds: number;

  @Field()
  status: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;

  // @Field(() => Market, { nullable: true })
  // market?: Market;

  // @Field(() => Match, { nullable: true })
  // match?: Match;

  // @Field(() => MarketOption, { nullable: true })
  // marketOption?: MarketOption;
}
