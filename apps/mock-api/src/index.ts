import { createServer } from 'node:http';
import { createApp } from './app.ts';
import { PORT } from './config.ts';

const app = createApp();

/**
 * Http-сервер создаём отдельно от Express: в следующей задаче
 * к этому же серверу прикрепится Socket.IO (документ 5, §3.2).
 * `app.listen()` тоже создал бы сервер, но не отдал бы его наружу.
 */
const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Mini-MES mock-api запущен: http://localhost:${PORT}`);
  console.log(`Проверка здоровья: http://localhost:${PORT}/health`);
});
