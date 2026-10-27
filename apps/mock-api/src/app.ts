import express from 'express';
import type { Express } from 'express';
import { authRouter } from './routes/auth.routes.ts';

export const createApp = (): Express => {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
  });

  // Маршруты авторизации (документ 6, §8.3, §13.2)
  app.use('/api/v1/auth', authRouter);

  return app;
};
