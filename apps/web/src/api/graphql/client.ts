import { HttpLink, split } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getSession } from 'next-auth/react';

export function makeClient(): ApolloClient<InMemoryCache> {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    fetchOptions: { cache: 'no-store' },
  });

  const authLink = setContext(async (_, { headers }) => {
    if (typeof window === 'undefined') return { headers };

    const session = await getSession();
    const token = session?.refreshToken;

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const wsLink =
    typeof window !== 'undefined'
      ? new GraphQLWsLink(
          createClient({
            url: `${process.env.NEXT_PUBLIC_API_WS_URL}/graphql`,
            connectionParams: async () => {
              const session = await getSession();
              const token = session?.refreshToken;
              return {
                authorization: token ? `Bearer ${token}` : '',
              };
            },
          }),
        )
      : null;

  const splitLink =
    typeof window !== 'undefined' && wsLink
      ? split(
          ({ query }) => {
            const def = getMainDefinition(query);
            return (
              def.kind === 'OperationDefinition' &&
              def.operation === 'subscription'
            );
          },
          wsLink,
          authLink.concat(httpLink),
        )
      : authLink.concat(httpLink);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
  });
}
