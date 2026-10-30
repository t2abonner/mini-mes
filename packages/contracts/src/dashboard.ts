import type { Order } from './order';

/**
 * Сводная статистика дашборда за текущую смену.
 * 8 показателей — по документу 6, §15.11
 * (список повторяет §19.3 спецификации MES-MF).
 */
export interface DashboardSummary {
  /** Заказы в статусе «В производстве». */
  ordersInProduction: number;
  /** Заказы, ожидающие материалы. */
  ordersWaitingMaterials: number;
  /** Средневзвешенный процент выполнения активных заказов, 0–100. */
  overallProgressPercent: number;
  /** Деталей произведено за смену (годные). */
  detailsProducedThisShift: number;
  /** Деталей в браке за смену. */
  defectsThisShift: number;
  /** Станков в работе. */
  machinesRunning: number;
  /** Станков в простое. */
  machinesIdle: number;
  /** Станков на обслуживании. */
  machinesMaintenance: number;
}

/**
 * Конверт успешного списка (документ 3, §15.2 / документ 6, §13.1):
 * { items, page, pageSize, totalItems }.
 *
 * Дженерик: одна и та же «обёртка» для заказов, станков,
 * перемещений и всего остального, что отдаём списками.
 */
export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
}

/** Страница карточек заказов дашборда. */
export type DashboardOrdersPage = Paginated<Order>;
