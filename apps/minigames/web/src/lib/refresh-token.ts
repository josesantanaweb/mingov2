import { gql } from '@apollo/client';
import { makeClient } from '@/api/client';

const apolloClient = makeClient();

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    username: string;
    name: string;
    image: string;
  };
}

export async function refreshAccessToken(
  userId: string,
  refreshToken: string,
): Promise<RefreshTokenResponse | null> {
  if (!userId || !refreshToken) {
    // eslint-disable-next-line no-console
    console.warn('Missing userId or refreshToken for token refresh');
    return null;
  }

  try {
    const refreshTokenQuery = gql`
      query RefreshToken($id: String!, $refreshToken: String!) {
        refreshToken(id: $id, refreshToken: $refreshToken) {
          accessToken
          refreshToken
          user {
            id
            email
            username
            name
            image
          }
        }
      }
    `;

    const { data } = await apolloClient.query({
      query: refreshTokenQuery,
      variables: { id: userId, refreshToken },
    });

    return data?.refreshToken || null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error refreshing token:', error);
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= decoded.exp * 1000;
  } catch {
    return true;
  }
}

export function getTokenExpiration(token: string): number {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded.exp * 1000;
  } catch {
    return 0;
  }
}
