import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  name: string;
  // email: string;
  // cnpj: string;
  // role: string;
  token: string;
  // confirmed_email: boolean;
  // usage_disk: number;
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
        name: "",
        // email: "",
        // cnpj: "",
        // role: "",
        token: "",
        // confirmed_email: false,
        // usage_disk: 0,
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
            // cnpj: "",
            // email: "",
            name: "",
            // role: "",
            token: "",
            // confirmed_email: false,
            // usage_disk: 0,
          },
        })),
    }),
    {
      name: "@user-auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
