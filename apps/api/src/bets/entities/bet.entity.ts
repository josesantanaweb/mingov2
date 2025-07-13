import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Match } from '../../matches/entities/match.entity';
import { Market } from '../../markets/entities/market.entity';
import { MarketOption } from '../../market-options/entities/market-option.entity';

@ObjectType()
export class Bet {
  @Field(() => ID)
  id: string;

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

  @Field(() => Market, { nullable: true })
  market?: Market;

  @Field(() => Match, { nullable: true })
  match?: Match;

  @Field(() => MarketOption)
  marketOption: MarketOption;
}
