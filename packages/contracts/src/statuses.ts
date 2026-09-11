/**
 * Статусные модели и перечисления домена (документ 6, §11, §12.3).
 */

/** Операционные зоны (§10.5; коды согласованы с примером §13.4 — "edging"). */
export type Zone = 'cutting' | 'edging' | 'drilling' | 'milling';

/** Уровень отклонения прогноза от плана (§12.3). */
export type DeviationLevel = 'neutral' | 'warning' | 'critical';

/** Статусы производственного заказа (§11.1). */
export type OrderStatus = 'waiting_materials' | 'in_production' | 'completed';

/** Статусы станка (§11.2). */
export type MachineStatus = 'running' | 'idle' | 'maintenance';

/** Статусы цехового задания (§11.3). */
export type ShopTaskStatus = 'assigned' | 'running' | 'completed' | 'canceled';

/** Статусы складского перемещения (§11.4). */
export type MovementStatus = 'pending' | 'assigned' | 'in_progress' | 'completed';
