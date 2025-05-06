import { Field, Int, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateRoomInput {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => Int)
  @IsNumber()
  award: number;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  status?: true;

  @Field(() => Int)
  @IsNumber()
  price: number;
}

@InputType()
export class AddUserToRoomInput {
  @Field(() => String)
  @IsString()
  userId: string;

  @Field(() => String)
  @IsString()
  roomId: string;

  @Field(() => Int)
  @IsNumber()
  numberOfCards: number;
}
