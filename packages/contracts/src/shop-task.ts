import type { ShopTaskStatus, Zone } from './statuses';

/**
 * Цеховое задание (документ 6, §10.4).
 */
export interface ShopTask {
  id: string;
  orderId: string;
  /** Идентификатор партии; коллекция партий появится в следующих задачах. */
  batchId: string;
  machineId: string;
  zone: Zone;
  status: ShopTaskStatus;
  assignedOperatorId: string;
  plannedQty: number;
  goodQty: number;
  defectQty: number;
}
