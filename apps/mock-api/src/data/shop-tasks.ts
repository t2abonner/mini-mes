import type { ShopTask } from '@mini-mes/contracts';

/**
 * Цеховые задания стенда (документ 6, §10.4).
 *
 * История данных согласована с заказами и станками:
 * — «Заказ-000123» (партия 1): раскрой завершён (брак 2 шт.),
 *   кромление выполняется (брак 4 шт.) — итого 6 шт. брака заказа;
 * — сверление партии 1 ещё назначено, не начато;
 * — «Заказ-000125»: раскрой выполняется.
 */
export const shopTasks: ShopTask[] = [
  {
    id: 't-1',
    orderId: 'ord-1',
    batchId: 'b-ord1-1',
    machineId: 'm-ks-02',
    zone: 'cutting',
    status: 'completed',
    assignedOperatorId: 'u-operator',
    plannedQty: 320,
    goodQty: 320,
    defectQty: 2,
  },
  {
    id: 't-2',
    orderId: 'ord-1',
    batchId: 'b-ord1-1',
    machineId: 'm-ke-01',
    zone: 'edging',
    status: 'running',
    assignedOperatorId: 'u-operator',
    plannedQty: 320,
    goodQty: 120,
    defectQty: 4,
  },
  {
    id: 't-3',
    orderId: 'ord-1',
    batchId: 'b-ord1-1',
    machineId: 'm-kd-01',
    zone: 'drilling',
    status: 'assigned',
    assignedOperatorId: 'u-operator',
    plannedQty: 320,
    goodQty: 0,
    defectQty: 0,
  },
  {
    id: 't-4',
    orderId: 'ord-3',
    batchId: 'b-ord3-1',
    machineId: 'm-ks-01',
    zone: 'cutting',
    status: 'running',
    assignedOperatorId: 'u-operator',
    plannedQty: 180,
    goodQty: 60,
    defectQty: 0,
  },
];
