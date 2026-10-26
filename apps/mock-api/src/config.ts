/**
 * Конфигурация мок-сервера.
 * Порт 4000 зафиксирован в документе 6, §7 и в .env клиента
 * (VITE_API_BASE_URL) — Vite проксирует сюда /api и /socket.io.
 */
export const PORT = Number(process.env.PORT ?? 4000);
