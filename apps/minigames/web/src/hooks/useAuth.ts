import { useMutation, useLazyQuery } from '@apollo/client';
import { useState, useEffect, useCallback } from 'react';
import { LOGIN, REGISTER, REFRESH_TOKEN, LOGOUT } from '@/api/graphql/mutations/auth';
import { tokenStorage } from '@/utils/tokenStorage';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput extends LoginInput {
  name: string;
  username: string;
  code?: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const useAuth = () => {
  const [loginMutation] = useMutation(LOGIN);
  const [registerMutation] = useMutation(REGISTER);
  const [logoutMutation] = useMutation(LOGOUT);
  const [refreshTokenQuery] = useLazyQuery(REFRESH_TOKEN);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const checkAuthStatus = useCallback(() => {
    const token = tokenStorage.getAccessToken();
    if (!token) {
      setIsAuthenticated(false);
      setCurrentUser(null);
      return;
    }

    try {
      const decoded = jwtDecode<{ exp: number } & User>(token);
      const isValid = decoded.exp * 1000 > Date.now();

      setIsAuthenticated(isValid);
      setCurrentUser(isValid ? {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        username: decoded.username,
        image: decoded.image
      } : null);
    } catch {
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();

    const handleTokenChange = () => {
      checkAuthStatus();
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken' || e.key === 'refreshToken') {
        checkAuthStatus();
      }
    };

    window.addEventListener('tokenChange', handleTokenChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('tokenChange', handleTokenChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkAuthStatus]);

  const login = async (input: LoginInput): Promise<AuthResponse> => {
    const { data } = await loginMutation({
      variables: { input }
    });

    const authData = data.login;

    tokenStorage.setAccessToken(authData.accessToken);
    tokenStorage.setRefreshToken(authData.refreshToken);

    return authData;
  };

  const register = async (input: RegisterInput): Promise<AuthResponse> => {
    const { data } = await registerMutation({
      variables: { input }
    });

    const authData = data.register;

    tokenStorage.setAccessToken(authData.accessToken);
    tokenStorage.setRefreshToken(authData.refreshToken);

    return authData;
  };

  const logout = async (userId: string): Promise<void> => {
    try {
      await logoutMutation({
        variables: { id: userId }
      });

      tokenStorage.removeTokens();
    } catch {
      tokenStorage.removeTokens();
      throw new Error('Logout failed');
    }
  };

  const refreshAccessToken = async (): Promise<AuthResponse | null> => {
    try {
      const refreshToken = tokenStorage.getRefreshToken();
      const accessToken = tokenStorage.getAccessToken();

      if (!refreshToken || !accessToken) {
        throw new Error('No refresh token available');
      }

      const decoded = jwtDecode<{ id: string }>(accessToken);

      const { data } = await refreshTokenQuery({
        variables: {
          id: decoded.id,
          refreshToken
        }
      });

      const authData = data.refreshToken;

      tokenStorage.setAccessToken(authData.accessToken);
      tokenStorage.setRefreshToken(authData.refreshToken);

      return authData;
    } catch {
      tokenStorage.removeTokens();
      return null;
    }
  };

  const getCurrentUser = (): User | null => {
    return currentUser;
  };

  return {
    login,
    register,
    logout,
    refreshAccessToken,
    isAuthenticated,
    getCurrentUser
  };
};
