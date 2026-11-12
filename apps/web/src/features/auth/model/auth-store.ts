import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser } from '@mini-mes/contracts';

interface AuthState {
  // Состояние
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;

  // Экшены
  setSession: (accessToken: string, refreshToken: string, user: AuthUser) => void;
  updateAccessToken: (accessToken: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Начальное состояние
      accessToken: null,
      refreshToken: null,
      user: null,

      // Экшены
      setSession: (accessToken, refreshToken, user) => {
        set({ accessToken, refreshToken, user });
      },

      updateAccessToken: (accessToken) => {
        set({ accessToken });
      },

      clearSession: () => {
        set({ accessToken: null, refreshToken: null, user: null });
      },
    }),
    {
      name: 'mini-mes/auth', // Ключ в localStorage
      // persist автоматически синхронизирует с localStorage
    },
  ),
);
