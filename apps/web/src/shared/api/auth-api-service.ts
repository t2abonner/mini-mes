import { api } from './axios-instance';
import { useAuthStore } from '../../features/auth';
import type { LoginRequest, AuthResponse } from '@mini-mes/contracts';

export const authApiService = {
  login: async (credentials: LoginRequest) => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    const { accessToken, refreshToken, user } = response.data;

    // Сохраняем в стор (persist автоматически синхронизирует с localStorage)
    useAuthStore.getState().setSession(accessToken, refreshToken, user);

    return user;
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      // Очищаем стор даже если запрос не удался
      useAuthStore.getState().clearSession();
    }
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};
