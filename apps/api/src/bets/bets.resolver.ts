import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BetsService } from './bets.service';
import { Bet } from './entities/bet.entity';
import { CreateBetInput } from './input/bets.input';

@Resolver()
export class BetsResolver {
  constructor(private readonly betsService: BetsService) {}

  @Query(() => [Bet], { name: 'bets' })
  bets(): Promise<Bet[]> {
    return this.betsService.findAll();
  }

  @Mutation(() => Bet, { name: 'createBet' })
  createBet(
    @Args('input', { type: () => CreateBetInput })
    input: CreateBetInput,
  ): Promise<Bet> {
    return this.betsService.create(input);
  }
}
