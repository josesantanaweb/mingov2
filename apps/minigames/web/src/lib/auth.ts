import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { gql } from '@apollo/client';
import { makeClient } from '@/api/client';

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
                  username
                  name
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
            image: null,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.user.id = token.id;
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
