import type { DashboardSummary } from '@mini-mes/contracts';
import { db } from '../db.ts';

/**
 * Вычисления дашборда над in-memory данными.
 *
 * В реальной системе это читало бы готовую read-model
 * (ADR-14: дашборд строится на отдельной проекции). У нас стенд —
 * считаем на лету, но ФОРМА ответа уже боевая.
 */

/**
 * Сводная статистика (документ 6, §15.11).
 *
 * Учебное допущение: «за смену» считаем текущие суммы по всем
 * заказам — истории событий на стенде нет. Когда появится
 * симулятор цеха, он сможет вести счётчики честнее.
 */
export const buildDashboardSummary = (): DashboardSummary => {
  const { orders, machines } = db;

  const activeOrders = orders.filter((order) => order.status === 'in_production');

  // Средневзвешенный прогресс: суммарные годные к суммарному плану
  // активных заказов. Не среднее арифметическое процентов — иначе
  // маленький заказ перевесит большой.
  const totalPlanned = activeOrders.reduce((sum, order) => sum + order.totalPlannedQty, 0);
  const totalGood = activeOrders.reduce((sum, order) => sum + order.goodQty, 0);
  const overallProgressPercent =
    totalPlanned === 0 ? 0 : Math.round((totalGood / totalPlanned) * 1000) / 10;

  return {
    ordersInProduction: activeOrders.length,
    ordersWaitingMaterials: orders.filter((order) => order.status === 'waiting_materials').length,
    overallProgressPercent,
    detailsProducedThisShift: orders.reduce((sum, order) => sum + order.goodQty, 0),
    defectsThisShift: orders.reduce((sum, order) => sum + order.defectQty, 0),
    machinesRunning: machines.filter((machine) => machine.status === 'running').length,
    machinesIdle: machines.filter((machine) => machine.status === 'idle').length,
    machinesMaintenance: machines.filter((machine) => machine.status === 'maintenance').length,
  };
};

/** Параметры пагинации после нормализации. */
interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * Достаёт и нормализует параметры пагинации из query-строки.
 *
 * Почему вручную, а не Zod? Библиотека валидации у нас живёт
 * в пакете `validation` и ориентирована на контракт клиента;
 * сервер-имитатор нарочно остаётся зависимостей-минимальным.
 *
 * Правила:
 *  - не число / мусор → значение по умолчанию;
 *  - page < 1 → 1; pageSize вне 1..100 → ближайшая граница.
 */
export const parsePagination = (query: Record<string, unknown>): PaginationParams => {
  const DEFAULT_PAGE_SIZE = 20;
  const MAX_PAGE_SIZE = 100;

  const pageRaw = Number(query.page);
  const pageSizeRaw = Number(query.pageSize);

  // Number(undefined) === NaN; NaN не проходит ни одно сравнение —
  // этим и пользуемся: любое «не число» падает в дефолты.
  const page = Number.isFinite(pageRaw) && pageRaw >= 1 ? Math.trunc(pageRaw) : 1;
  const pageSize = Number.isFinite(pageSizeRaw)
    ? Math.min(Math.max(Math.trunc(pageSizeRaw), 1), MAX_PAGE_SIZE)
    : DEFAULT_PAGE_SIZE;

  return { page, pageSize };
};

/**
 * Страница карточек заказов.
 *
 * Сортировка по умолчанию — стабильная по `id`: клиенту важна
 * детерминированность (одинаковый ответ на одинаковый запрос),
 * а управляющие параметры sortBy/sortDir появятся в задаче про
 * фильтры дашборда.
 */
export const buildOrdersPage = ({ page, pageSize }: PaginationParams) => {
  const sorted = [...db.orders].sort((a, b) => a.id.localeCompare(b.id));
  const totalItems = sorted.length;
  const start = (page - 1) * pageSize;
  const items = sorted.slice(start, start + pageSize);
  return { items, page, pageSize, totalItems };
};

/** Панель станков: полный список, сгруппирует уже клиент. */
export const buildMachinesPage = () => db.machines;
