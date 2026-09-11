import type { DeviationLevel, OrderStatus, Zone } from './statuses';

/**
 * Производственный заказ (документ 6, §10.2).
 * Все даты — строки в формате ISO 8601, UTC.
 */
export interface Order {
  id: string;
  /** Номер заказа, например «Заказ-000123». */
  number: string;
  customerName: string;
  status: OrderStatus;
  /** Плановое количество годных деталей. */
  totalPlannedQty: number;
  /** Годные детали. */
  goodQty: number;
  /** Брак (не уменьшает требуемое количество годных, §12.5). */
  defectQty: number;
  /** Прогресс выполнения, 0–100 (§12.1). */
  progressPercent: number;
  currentZone: Zone;
  /** Номер текущей партии. */
  currentBatchNumber: number;
  /** Всего партий по заказу. */
  totalBatches: number;
  /** Плановое завершение (ISO 8601, UTC). */
  plannedFinishAt: string;
  /** Прогнозируемое завершение (ISO 8601, UTC). */
  predictedFinishAt: string;
  deviationLevel: DeviationLevel;
  /** Количество плит ЛДСП. */
  totalSlabs: number;
  /** Метры кромки. */
  totalEdgeMeters: number;
  /** Количество отверстий присадки. */
  totalHoles: number;
}
