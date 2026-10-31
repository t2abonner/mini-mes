import express from 'express';
import type { Express } from 'express';
import { authRouter } from './routes/auth.routes.ts';
import { dashboardRouter } from './routes/dashboard.routes.ts';

/**
 * Создаёт Express-приложение мок-сервера.
 *
 * Приложение отделено от запуска (см. index.ts): так его можно
 * будет в следующей задаче прикрепить к http-серверу вместе
 * с Socket.IO, а позже — использовать в тестах без поднятия порта.
 */

export const createApp = (): Express => {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
  });

  // Маршруты авторизации (документ 6, §8.3, §13.2)
  app.use('/api/v1/auth', authRouter);
  // Маршруты дашборда (документ 6, §13.2)
  app.use('/api/v1/dashboard', dashboardRouter); // ← добавили

  return app;
};
