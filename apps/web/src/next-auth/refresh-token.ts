import axios from 'axios';
import type { JWT } from 'next-auth/jwt';

export const refreshToken = async (token: JWT) => {
  try {
    const response = await axios.post(
      'http://localhost:4000/api/auth/refresh',
      {
        id: String(token.id ?? ''),
      }
    );

    return {
      ...token,
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      accessTokenExpires: Date.now() + 10 * 1000,
    };
  } catch (error: any) {
    console.error(
      'Error refreshing access token',
      error?.response?.data || error.message
    );
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};
