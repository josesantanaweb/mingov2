import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Card } from './entities/card.entity';
import { CardsService } from './cards.service';

@Resolver(() => Card)
export class CardsResolver {
  constructor(private readonly cardsService: CardsService) {}

  @Query(() => [Card], { name: 'cards' })
  cards() {
    return this.cardsService.findAll();
  }

  @Query(() => Card, { name: 'card' })
  card(@Args('id', { type: () => String }) id: string) {
    return this.cardsService.findOne(id);
  }

  @Mutation(() => Card, { name: 'createCard' })
  createCard() {
    return this.cardsService.createCard();
  }
}
