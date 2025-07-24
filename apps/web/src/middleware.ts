import NextAuth from 'next-auth';

import authConfig from '@/next-auth/auth.config';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  isPublicRoute,
} from '@/routes';

import { LOGIN_REDIRECT_ROUTE } from './constants';

const { auth } = NextAuth(authConfig);

export default auth(async req => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isPublic = isPublicRoute(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublic) {
    return Response.redirect(new URL(LOGIN_REDIRECT_ROUTE, nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mp3|wav|ogg)).*)',
    '/(api|trpc)(.*)',
  ],
};
