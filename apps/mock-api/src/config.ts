/**
 * Конфигурация мок-сервера.
 * Порт 4000 зафиксирован в документе 6, §7 и в .env клиента
 * (VITE_API_BASE_URL) — Vite проксирует сюда /api и /socket.io.
 */
export const PORT = Number(process.env.PORT ?? 4000);
/**
 * Время жизни access-токена — 120 секунд (документ 6, §8.3).
 * Срок намеренно короткий: тренируем механику 401 → refresh → повтор.
 */
export const ACCESS_TOKEN_TTL_MS = 120_000;

/**
 * Время жизни refresh-токена — 12 часов.
 * Его хватит на учебную сессию без повторного входа.
 */
export const REFRESH_TOKEN_TTL_MS = 12 * 60 * 60 * 1000;
