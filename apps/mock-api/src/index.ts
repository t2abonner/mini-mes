import { createServer } from 'node:http';
import { createApp } from './app.ts';
import { PORT } from './config.ts';
import { setupSocketServer } from './realtime/socket-server.ts';
import { startSimulator } from './realtime/simulator.ts';

const app = createApp();

/**
 * Http-сервер создаём отдельно от Express: к этому же серверу
 * прикрепляется Socket.IO (документ 5, §3.2).
 * `app.listen()` тоже создал бы сервер, но не отдал бы его наружу.
 */
const server = createServer(app);

// Инициализируем WebSocket и симулятор ДО запуска прослушивания порта.
// Socket.IO должен быть прикреплён к серверу до того, как сервер
// начнёт принимать HTTP-запросы (включая handshake-запросы WS).
const io = setupSocketServer(server);
startSimulator(io);

// ✅ Единственный вызов listen — после всех инициализаций.
server.listen(PORT, () => {
  console.log(`Mini-MES mock-api запущен: http://localhost:${PORT}`);
  console.log(`Проверка здоровья: http://localhost:${PORT}/health`);
  console.log(`Socket.IO слушает на том же порту`);
});
