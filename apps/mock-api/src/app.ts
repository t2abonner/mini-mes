import express from 'express';
import type { Express } from 'express';

/**
 * Создаёт Express-приложение мок-сервера.
 *
 * Приложение отделено от запуска (см. index.ts): так его можно
 * будет в следующей задаче прикрепить к http-серверу вместе
 * с Socket.IO, а позже — использовать в тестах без поднятия порта.
 */
export const createApp = (): Express => {
  const app = express();

  // Не рекламируем стек в заголовках ответа: X-Powered-By снимаем намеренно.
  app.disable('x-powered-by');

  // Тело будущих POST-запросов (завершение операции, фиксация брака)
  // приходит в JSON — подключаем парсер уже сейчас.
  app.use(express.json());

  // Служебный эндпоинт без авторизации (документ 6, §13.1):
  // клиент будет пинговать его при определении восстановления связи (§16.4).
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
  });

  return app;
};
