import type { StateCreator } from 'zustand';

import type { User as UserType } from '@/__generated__/graphql';

export type UserState = {
  user: UserType | null;
  setUser: (user: UserType) => void;
};

export const createUserSlice: StateCreator<UserState> = set => ({
  user: null,
  setUser: (user: UserType) => set({ user }),
});
