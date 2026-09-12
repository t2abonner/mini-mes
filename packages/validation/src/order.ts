import { z } from 'zod';

import { deviationLevelSchema, orderStatusSchema, zoneSchema } from './statuses.ts';

/**
 * Производственный заказ (документ 6, §10.2; пример контракта — §13.4).
 * Все даты — строки в формате ISO 8601, UTC.
 */
export const orderSchema = z.object({
  id: z.string().min(1),
  number: z.string().min(1),
  customerName: z.string().min(1),
  status: orderStatusSchema,
  /** Плановое количество годных деталей. */
  totalPlannedQty: z.number().int().nonnegative(),
  /** Годные детали. */
  goodQty: z.number().int().nonnegative(),
  /** Брак (не уменьшает требуемое количество годных, §12.5). */
  defectQty: z.number().int().nonnegative(),
  /** Прогресс выполнения, 0–100 (§12.1). */
  progressPercent: z.number().min(0).max(100),
  currentZone: zoneSchema,
  /** Номер текущей партии. */
  currentBatchNumber: z.number().int().nonnegative(),
  /** Всего партий по заказу. */
  totalBatches: z.number().int().nonnegative(),
  /** Плановое завершение (ISO 8601, UTC). */
  plannedFinishAt: z.iso.datetime(),
  /** Прогнозируемое завершение (ISO 8601, UTC). */
  predictedFinishAt: z.iso.datetime(),
  deviationLevel: deviationLevelSchema,
  /** Количество плит ЛДСП. */
  totalSlabs: z.number().int().nonnegative(),
  /** Метры кромки. */
  totalEdgeMeters: z.number().nonnegative(),
  /** Количество отверстий присадки. */
  totalHoles: z.number().int().nonnegative(),
});

/** Тип заказа выводится из схемы — единый источник правды. */
export type Order = z.infer<typeof orderSchema>;
