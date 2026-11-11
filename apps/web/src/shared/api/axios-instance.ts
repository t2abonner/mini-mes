import axios from 'axios';
import { useAuthStore } from '../../features/auth';

// В dev-режиме Vite проксирует /api на localhost:4000
// В проде nginx будет проксировать /api на бэкенд
export const api = axios.create({
  baseURL: '/api/v1', // Относительный путь для прокси
  headers: {
    'Content-Type': 'application/json',
  },
});

// === Request Interceptor ===
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// === Response Interceptor с очередью ===
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const PUBLIC_ENDPOINTS = ['/auth/login', '/auth/refresh'] as const;

    const isPublicRequest = (url?: string): boolean =>
      PUBLIC_ENDPOINTS.some((path) => url?.includes(path));

    // Защита от зацикливания: не пытаемся рефрешить сам запрос на refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isPublicRequest(originalRequest.url)
    ) {
      // Если уже идёт рефреш — добавляем в очередь и ждём
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // Первый запрос, получивший 401 — запускаем рефреш
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Запрос на рефреш (без интерцептора, чтобы избежать зацикливания)
        const response = await axios.post('/api/v1/auth/refresh', null, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        const { accessToken, user } = response.data;

        // Обновляем стор
        useAuthStore.getState().updateAccessToken(accessToken);
        useAuthStore.setState({ user }); // Обновляем user если изменился

        // Раздаём новый токен всем ждущим
        processQueue(null, accessToken);

        // Повторяем исходный запрос с новым токеном
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Рефреш не удался — разлогиниваем пользователя
        processQueue(refreshError as Error, null);
        useAuthStore.getState().clearSession();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // 403: сообщение о недостатке прав (тост подключим позже, пока — лог)
    if (error.response?.status === 403) {
      // TODO(MM-308): показать toast «Недостаточно прав»
      console.error('Forbidden: недостаточно прав');
    }

    // Единая нормализация для ВСЕХ ошибок, включая 409 и провалившийся 401:
    const normalizedError = {
      status: error.response?.status as number | undefined,
      errorCode: (error.response?.data?.errorCode as string | undefined) ?? 'UNKNOWN_ERROR',
      message: (error.response?.data?.message as string | undefined) ?? 'Произошла ошибка',
    };

    return Promise.reject(normalizedError);
  },
);
