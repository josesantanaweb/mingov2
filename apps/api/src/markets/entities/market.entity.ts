import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { MarketOption } from '../../market-options/entities/market-option.entity';
import { MarketType } from '../../market-types/entities/market-type.entity';

@ObjectType()
export class Market {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  matchId: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;

  @Field(() => MarketType, { nullable: true })
  marketType?: MarketType;

  @Field(() => [MarketOption], { nullable: true })
  marketOptions?: MarketOption[];
}
