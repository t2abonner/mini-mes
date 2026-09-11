import type { MachineStatus, Zone } from './statuses';

/**
 * Станок (документ 6, §10.3).
 */
export interface Machine {
  id: string;
  /** Код станка. */
  code: string;
  name: string;
  /** Модель (KDT KS-832H и т.п., §10.5). */
  model: string;
  zone: Zone;
  status: MachineStatus;
  /** Текущий заказ — присутствует, только если станок что-то обрабатывает. */
  orderId?: string;
  /** Текущая партия — присутствует вместе с orderId. */
  batchNumber?: number;
}
