import NextAuth from 'next-auth';

import authConfig from '@/next-auth/auth.config';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes';

import { LOGIN_REDIRECT_ROUTE } from './constants';

const { auth } = NextAuth(authConfig);

export default auth(async req => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  // const isPublicRoute = publicRoutes.some((route) =>
  //   nextUrl.pathname.startsWith(route)
  // );
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(LOGIN_REDIRECT_ROUTE, nextUrl));
  }

  return;
});

// export const config = {
//   // matcher: ["/((?!api|/|_next/static|_next/image|favicon.ico).*)"],
//   matcher: ['/game'],
// };
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
