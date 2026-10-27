import { machines } from './data/machines.ts';
import { orders } from './data/orders.ts';
import { shopTasks } from './data/shop-tasks.ts';
import { users } from './data/users.ts';

/**
 * Сессия авторизации: связка пары непрозрачных токенов с пользователем.
 * Сами токены ничего не содержат — сервер ищет по ним запись здесь
 * (документ 6, §8.3).
 */
export interface Session {
  accessToken: string;
  refreshToken: string;
  userId: string;
  /** Момент (мс от эпохи), после которого access-токен не принимается. */
  accessExpiresAt: number;
  /** Момент истечения refresh-токена. */
  refreshExpiresAt: number;
  createdAt: number;
}

export const db = {
  users,
  orders,
  machines,
  shopTasks,
  /** Активные сессии. Перезапуск процесса очищает хранилище. */
  sessions: [] as Session[],
};
