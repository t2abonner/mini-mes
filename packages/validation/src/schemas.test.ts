/**
 * Рантайм-проверка критерия готовности задачи: схемы принимают корректные
 * данные и отклоняют битые. Запускается встроенным тест-раннером Node:
 * `npm run test -w @mini-mes/validation` (Node 24 выполняет .ts нативно).
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  apiErrorSchema,
  machineSchema,
  orderSchema,
  paginatedListSchema,
  zoneSchema,
} from './index.ts';
import type { Machine, Order } from './index.ts';

// Эталонные данные — из примера контракта (документ 6, §13.4).
const validOrder: Order = {
  id: 'ord-1',
  number: 'Заказ-000123',
  customerName: 'ИП Петров',
  status: 'in_production',
  totalPlannedQty: 640,
  goodQty: 320,
  defectQty: 6,
  progressPercent: 50,
  currentZone: 'edging',
  currentBatchNumber: 1,
  totalBatches: 2,
  plannedFinishAt: '2026-06-12T18:00:00Z',
  predictedFinishAt: '2026-06-12T20:15:00Z',
  deviationLevel: 'warning',
  totalSlabs: 24,
  totalEdgeMeters: 232,
  totalHoles: 5120,
};

test('orderSchema принимает корректный заказ', () => {
  assert.deepEqual(orderSchema.parse(validOrder), validOrder);
});

test('orderSchema отклоняет битые данные', () => {
  const brokenCases = [
    { ...validOrder, progressPercent: 150 }, // прогресс больше 100 (§12.1)
    { ...validOrder, status: 'shipped' }, // несуществующий статус
    { ...validOrder, totalPlannedQty: -1 }, // отрицательное количество
    { ...validOrder, plannedFinishAt: 'завтра' }, // строка не в формате ISO 8601
    { ...validOrder, customerName: undefined }, // обязательное поле отсутствует
  ];

  for (const broken of brokenCases) {
    const result = orderSchema.safeParse(broken);
    assert.equal(result.success, false, `Ожидали ошибку валидации: ${JSON.stringify(broken)}`);
  }
});

test('ошибка валидации содержит список проблем (issues)', () => {
  const result = orderSchema.safeParse({
    ...validOrder,
    progressPercent: 150,
    totalHoles: -5,
  });

  assert.equal(result.success, false);
  if (!result.success) {
    // Обе проблемы должны попасть в отчёт, а не только первая.
    assert.ok(result.error.issues.length >= 2);
  }
});

test('machineSchema принимает работающий станок с заказом и партией', () => {
  const machine: Machine = {
    id: 'm-1',
    code: 'KS-01',
    name: 'Пильный центр',
    model: 'KDT KS-832H',
    zone: 'cutting',
    status: 'running',
    orderId: 'ord-1',
    batchNumber: 1,
  };
  assert.deepEqual(machineSchema.parse(machine), machine);
});

test('machineSchema принимает станок в простое без заказа', () => {
  const machine: Machine = {
    id: 'm-2',
    code: 'KE-01',
    name: 'Кромкооблицовочный станок',
    model: 'KDT KE-710BT',
    zone: 'edging',
    status: 'idle',
  };
  assert.deepEqual(machineSchema.parse(machine), machine);
});

test('machineSchema отклоняет работающий станок без заказа', () => {
  const result = machineSchema.safeParse({
    id: 'm-3',
    code: 'KD-01',
    name: 'Сверлильно-присадочный центр',
    model: 'KDT KD-510H',
    zone: 'drilling',
    status: 'running',
  });
  assert.equal(result.success, false);
});

test('machineSchema отклоняет партию без заказа', () => {
  const result = machineSchema.safeParse({
    id: 'm-4',
    code: 'KN-01',
    name: 'Фрезерный обрабатывающий центр',
    model: 'KDT KN-2710L',
    zone: 'milling',
    status: 'idle',
    batchNumber: 2,
  });
  assert.equal(result.success, false);
});

test('paginatedListSchema принимает формат списка (§13.1)', () => {
  const listSchema = paginatedListSchema(orderSchema);
  const page = { items: [validOrder], page: 1, pageSize: 20, totalItems: 1 };

  assert.deepEqual(listSchema.parse(page), page);
  assert.equal(listSchema.safeParse({ items: [validOrder] }).success, false);
});

test('apiErrorSchema принимает формат ошибки (§8.5)', () => {
  const error = {
    timestamp: '2026-09-03T10:00:00Z',
    errorCode: 'TASK_ALREADY_COMPLETED',
    message: 'Задание уже завершено.',
  };
  assert.deepEqual(apiErrorSchema.parse(error), error);
});

test('zoneSchema принимает известные зоны и отклоняет чужие', () => {
  assert.equal(zoneSchema.safeParse('cutting').success, true);
  assert.equal(zoneSchema.safeParse('welding').success, false);
});
