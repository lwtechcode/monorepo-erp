import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type User = {
  name: string;
  token: string;
};

type AuthStore = {
  user: User;
  setUserAuth: (user: Partial<User>) => void;
  clearUserAuth: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: {
        name: '',
        token: '',
      },
      setUserAuth: (user) =>
        set((state) => ({
          user: {
            ...state.user,
            ...user,
          },
        })),
      clearUserAuth: () =>
        set(() => ({
          user: {
            name: '',
            token: '',
          },
        })),
    }),
    {
      name: '@user-auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const isAuthenticated = () => {
  const { user } = useAuthStore.getState();
  return Boolean(user.token);
};
