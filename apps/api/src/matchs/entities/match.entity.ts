import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Team } from '../../teams/entities/team.entity';

@ObjectType()
export class Match {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => GraphQLISODateTime)
  dateAt: Date;

  @Field()
  totalAmount: number;

  @Field(() => Boolean, { nullable: true })
  isLive?: boolean;

  @Field(() => Boolean, { nullable: true })
  status?: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;

  @Field(() => Team)
  homeTeam: Team;

  @Field(() => Team)
  awayTeam: Team;

  // @Field(() => Market)
  // markets: Market[];

  // @Field(() => Bet)
  // markets: Bet[];
}
