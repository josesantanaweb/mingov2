import { Field, Int, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateBetInput {
  @Field(() => Int)
  @IsNumber()
  amount: number;

  @Field(() => Int)
  @IsNumber()
  odds: number;

  @Field(() => String)
  @IsString()
  userId: string;

  @Field(() => String)
  @IsString()
  matchId: string;

  @Field(() => String)
  @IsString()
  marketId: string;

  @Field(() => String)
  @IsString()
  marketOptionId: string;
}
