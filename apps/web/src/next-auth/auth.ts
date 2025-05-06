import NextAuth from 'next-auth';
import { jwtDecode } from 'jwt-decode';
import type { JWT } from 'next-auth/jwt';

import authConfig from '@/next-auth/auth.config';
import { refreshToken } from '@/next-auth/refresh-token';
import { LOGIN_REDIRECT_ROUTE } from '@/constants';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: LOGIN_REDIRECT_ROUTE,
  },
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        const decoded = jwtDecode<{ exp: number }>(String(user.accessToken));
        return {
          ...token,
          id: user.id,
          email: user.email,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: (decoded.exp ?? 0) * 1000,
        } as JWT;
      }

      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      const response = await refreshToken(token);

      return {
        ...token,
        ...response,
      } as JWT;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        emailVerified: new Date(),
        email: token.email,
        name: token.name,
        image: token.image,
      };
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: parseInt(process.env.NEXTAUTH_SESSION_MAX_AGE || '86400', 10),
  },
  trustHost: true,
  ...authConfig,
});
