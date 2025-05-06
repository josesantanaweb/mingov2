import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { GraphQLClient } from 'graphql-request';

import { LOGIN } from '@/api/graphql/mutations/auth';
import type { IUser } from '@/types/user';

interface LoginResponse {
  login: {
    user: IUser;
    accessToken: string;
    refreshToken: string;
  };
}

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const client = new GraphQLClient(
          `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        try {
          const data: LoginResponse = await client.request(LOGIN, {
            input: {
              email: credentials.email,
              password: credentials.password,
            },
          });

          if (data?.login) {
            const { user, accessToken, refreshToken } = data.login;

            return {
              id: user.id,
              username: user.username,
              email: user.email,
              image: user.image,
              name: user.name,
              role: user.role,
              accessToken,
              refreshToken,
            };
          }
          return null;
        } catch (error) {
          console.error('Error en login:', error);
          return null;
        }
      },
    }),
    Google({
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
} satisfies NextAuthConfig;
