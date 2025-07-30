import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { gql } from '@apollo/client';
import { jwtDecode } from 'jwt-decode';
import { makeClient } from '@/api/client';
import { refreshAccessToken, isTokenExpired, getTokenExpiration } from './refresh-token';

const apolloClient = makeClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const loginMutation = gql`
            mutation Login($input: LoginInput!) {
              login(input: $input) {
                user {
                  id
                  email
                  username
                  name
                  image
                }
                accessToken
                refreshToken
              }
            }
          `;

          const { data } = await apolloClient.mutate({
            mutation: loginMutation,
            variables: {
              input: {
                email,
                password,
              },
            },
          });

          const loginData = data?.login;

          if (!loginData?.user?.id || !loginData?.accessToken) {
            return null;
          }

          return {
            id: loginData.user.id,
            email: loginData.user.email,
            name: loginData.user.name,
            username: loginData.user.username,
            image: loginData.user.image || null,
            accessToken: loginData.accessToken,
            refreshToken: loginData.refreshToken,
          };
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: parseInt(process.env.NEXTAUTH_SESSION_MAX_AGE || '86400', 10),
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const expiration = getTokenExpiration(String(user.accessToken));
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: expiration,
          user: {
            id: user.id as string,
            email: user.email as string,
            username: (user as any).username as string,
            name: user.name as string,
            image: (user as any).image as string,
          },
        };
      }

      if (token.accessToken && !isTokenExpired(token.accessToken)) {
        return token;
      }

      try {
        const refreshData = await refreshAccessToken(
          (token.user as any)?.id,
          token.refreshToken
        );

        if (refreshData) {
          const decoded = jwtDecode<{ exp: number }>(String(refreshData.accessToken));
          return {
            ...token,
            accessToken: refreshData.accessToken,
            refreshToken: refreshData.refreshToken,
            accessTokenExpires: (decoded.exp ?? 0) * 1000,
            user: refreshData.user,
          };
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error refreshing token:', error);
      }

      return { ...token, error: 'RefreshAccessTokenError', user: null, accessToken: null, refreshToken: null };
    },
    async session({ session, token }) {
      if (token?.error === 'RefreshAccessTokenError') {
        return { ...session, error: token.error, user: null, accessToken: null, refreshToken: null };
      }

      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.user = {
          ...session.user,
          id: (token.user as any)?.id,
          email: (token.user as any)?.email,
          name: (token.user as any)?.name,
          image: (token.user as any)?.image,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
});
