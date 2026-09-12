import { z } from 'zod';

/**
 * Статусные модели домена — зеркалят packages/contracts/src/statuses.ts
 * (документ 6, §11). Совпадение выведенных типов с контрактами
 * проверяется файлом compat.ts.
 */

/** Операционные зоны (документ 6, §10). */
export const zoneSchema = z.enum(['cutting', 'edging', 'drilling', 'milling']);

/** Уровень отклонения прогноза от плана (документ 6, §12.3). */
export const deviationLevelSchema = z.enum(['neutral', 'warning', 'critical']);

/** Статусы производственного заказа (документ 6, §11.1). */
export const orderStatusSchema = z.enum(['waiting_materials', 'in_production', 'completed']);

/** Статусы станка (документ 6, §11.2). */
export const machineStatusSchema = z.enum(['running', 'idle', 'maintenance']);

/** Статусы цехового задания (документ 6, §11.3). */
export const shopTaskStatusSchema = z.enum(['assigned', 'running', 'completed', 'canceled']);

/** Статусы складского перемещения (документ 6, §11.4). */
export const movementStatusSchema = z.enum(['pending', 'assigned', 'in_progress', 'completed']);

export type Zone = z.infer<typeof zoneSchema>;
export type DeviationLevel = z.infer<typeof deviationLevelSchema>;
export type OrderStatus = z.infer<typeof orderStatusSchema>;
export type MachineStatus = z.infer<typeof machineStatusSchema>;
export type ShopTaskStatus = z.infer<typeof shopTaskStatusSchema>;
export type MovementStatus = z.infer<typeof movementStatusSchema>;
