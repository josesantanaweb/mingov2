import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Team } from '../../teams/entities/team.entity';

@ObjectType()
export class League {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  country: string;

  @Field()
  logo: string;

  @Field(() => Boolean, { nullable: true })
  status?: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;

  @Field(() => [Team], { nullable: true })
  teams?: Team[];
}
