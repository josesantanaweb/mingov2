import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class MarketOption {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  odds: number;

  @Field()
  totalAmount: number;
}
