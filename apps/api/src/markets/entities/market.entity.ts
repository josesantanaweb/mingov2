import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class Market {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  icon: string;

  @Field(() => Boolean, { nullable: true })
  status?: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;
}
