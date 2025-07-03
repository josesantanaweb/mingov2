import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class MarketType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  icon: string;

  @Field()
  status: boolean;
}
