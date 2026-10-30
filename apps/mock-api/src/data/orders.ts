import type { Order } from '@mini-mes/contracts';

/**
 * Заказы стенда (документ 6, §10.2).
 *
 * Уровень отклонения согласован с правилом §12.3, а не с примером §13.4:
 * задержка = predictedFinishAt − plannedFinishAt;
 * ≤ 0 → «neutral», до 60 минут → «warning», более 60 минут → «critical».
 */
export const orders: Order[] = [
  {
    id: 'ord-1',
    number: 'Заказ-000123',
    customerName: 'ИП Петров',
    status: 'in_production',
    startedAt: '2026-06-10T08:15:00Z',
    totalPlannedQty: 640,
    goodQty: 320,
    defectQty: 6,
    progressPercent: 50,
    currentZone: 'edging',
    currentBatchNumber: 1,
    totalBatches: 2,
    plannedFinishAt: '2026-06-12T18:00:00Z',
    // Задержка 45 минут → «warning» по §12.3
    predictedFinishAt: '2026-06-12T18:45:00Z',
    deviationLevel: 'warning',
    totalSlabs: 24,
    totalEdgeMeters: 232,
    totalHoles: 5120,
  },
  {
    id: 'ord-2',
    number: 'Заказ-000124',
    customerName: 'ООО «МебельГрад»',
    status: 'waiting_materials',
    totalPlannedQty: 240,
    goodQty: 0,
    defectQty: 0,
    progressPercent: 0,
    currentZone: 'cutting',
    // Партии ещё не создавались — заказ ждёт материалы
    currentBatchNumber: 0,
    totalBatches: 1,
    plannedFinishAt: '2026-06-18T18:00:00Z',
    // Отклонения нет → «neutral»
    predictedFinishAt: '2026-06-18T18:00:00Z',
    deviationLevel: 'neutral',
    totalSlabs: 12,
    totalEdgeMeters: 118,
    totalHoles: 2040,
  },
  {
    id: 'ord-3',
    number: 'Заказ-000125',
    customerName: 'ИП Смирнова',
    status: 'in_production',
    startedAt: '2026-06-11T09:05:00Z',
    totalPlannedQty: 180,
    goodQty: 60,
    defectQty: 0,
    progressPercent: 33.3,
    currentZone: 'cutting',
    currentBatchNumber: 1,
    totalBatches: 1,
    plannedFinishAt: '2026-06-13T18:00:00Z',
    // Прогноз раньше плана → «neutral»
    predictedFinishAt: '2026-06-13T17:40:00Z',
    deviationLevel: 'neutral',
    totalSlabs: 8,
    totalEdgeMeters: 64,
    totalHoles: 1280,
  },
];
