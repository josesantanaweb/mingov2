import { Module } from '@nestjs/common';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RoomsModule } from './rooms/rooms.module';
import { CardsModule } from './cards/cards.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LeaguesModule } from './leagues/leagues.module';
import { TeamsModule } from './teams/teams.module';
import { MatchsModule } from './matchs/matchs.module';
import { BetsModule } from './bets/bets.module';
import { MarketsModule } from './markets/markets.module';
import { SeedsModule } from './seeds/seeds.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      introspection: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
      csrfPrevention: false,
      subscriptions: {
        'graphql-ws': true,
      },
      context: ({ req }) => ({ req }),
    }),
    UsersModule,
    RoomsModule,
    CardsModule,
    AuthModule,
    LeaguesModule,
    TeamsModule,
    MatchsModule,
    BetsModule,
    MarketsModule,
    SeedsModule,
  ],
})
export class AppModule {}
