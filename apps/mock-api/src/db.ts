import { machines } from './data/machines.ts';
import { orders } from './data/orders.ts';
import { shopTasks } from './data/shop-tasks.ts';
import { users } from './data/users.ts';

/**
 * In-memory «база данных» стенда (документ 6, §8.1–8.2).
 *
 * Перезапуск процесса возвращает данные в исходное состояние —
 * так задумано для учебного контура.
 *
 * Остальные коллекции из §8.2 (sessions, idempotencyStore,
 * movements, defects, notifications) будут добавляться по мере
 * реализации соответствующих эндпоинтов в следующих задачах.
 */
export const db = { users, orders, machines, shopTasks };
