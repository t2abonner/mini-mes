import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// defineConfig может принимать функцию, которая получает объект с текущим режимом (mode)
export default defineConfig(({ mode }) => {
  // loadEnv читает файлы .env, .env.local, .env.[mode] из указанной директории.
  // process.cwd() в контексте запуска npm-скрипта из воркспейса укажет на apps/web.
  // Третий аргумент '' означает, что мы хотим загрузить ВСЕ переменные,
  // а не только те, что начинаются с VITE_ (хотя мы будем использовать префикс VITE_).
  const env = loadEnv(mode, process.cwd(), '');

  // Извлекаем переменную. Если она не задана (файл .env удален),
  // используем безопасный фолбэк (fallback).
  const mockServerUrl = env.VITE_API_BASE_URL || 'http://localhost:4000';

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        // REST-запросы
        '/api': {
          target: mockServerUrl,
          changeOrigin: true,
        },
        // Socket.IO (WebSocket)
        '/socket.io': {
          target: mockServerUrl,
          changeOrigin: true,
          ws: true, // Критически важно для апгрейда HTTP-соединения до WebSocket
        },
      },
    },
  };
});
