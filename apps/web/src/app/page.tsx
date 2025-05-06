import { redirect } from 'next/navigation';

import { LOGIN_REDIRECT_ROUTE } from '@/constants';

export default function RootRedirect() {
  redirect(LOGIN_REDIRECT_ROUTE);
}
