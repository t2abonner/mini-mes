import type { Machine } from '@mini-mes/contracts';

/**
 * Станочный парк стенда — состав точно по документу 6, §10.5:
 * 2 пильных центра, 2 кромкооблицовочных, 3 сверлильно-присадочных,
 * 1 фрезерный.
 *
 * Инварианты (их же проверяет machineSchema в packages/validation):
 * — у станка в статусе «running» должен быть orderId;
 * — batchNumber указывается только вместе с orderId.
 */
export const machines: Machine[] = [
  {
    id: 'm-ks-01',
    code: 'KS-01',
    name: 'Пильный центр №1',
    model: 'KDT KS-832H',
    zone: 'cutting',
    status: 'running',
    orderId: 'ord-3',
    batchNumber: 1,
  },
  {
    id: 'm-ks-02',
    code: 'KS-02',
    name: 'Пильный центр №2',
    model: 'KDT KS-832H',
    zone: 'cutting',
    status: 'idle',
  },
  {
    id: 'm-ke-01',
    code: 'KE-01',
    name: 'Кромкооблицовочный станок №1',
    model: 'KDT KE-710BT',
    zone: 'edging',
    status: 'running',
    orderId: 'ord-1',
    batchNumber: 1,
  },
  {
    id: 'm-ke-02',
    code: 'KE-02',
    name: 'Кромкооблицовочный станок №2',
    model: 'KDT KE-710BT',
    zone: 'edging',
    status: 'maintenance',
  },
  {
    id: 'm-kd-01',
    code: 'KD-01',
    name: 'Сверлильно-присадочный центр №1',
    model: 'KDT KD-510H',
    zone: 'drilling',
    status: 'idle',
  },
  {
    id: 'm-kd-02',
    code: 'KD-02',
    name: 'Сверлильно-присадочный центр №2',
    model: 'KDT KD-510H',
    zone: 'drilling',
    status: 'idle',
  },
  {
    id: 'm-kd-03',
    code: 'KD-03',
    name: 'Сверлильно-присадочный центр №3',
    model: 'KDT KD-510H',
    zone: 'drilling',
    status: 'idle',
  },
  {
    id: 'm-kn-01',
    code: 'KN-01',
    name: 'Фрезерный обрабатывающий центр',
    model: 'KDT KN-2710L',
    zone: 'milling',
    status: 'idle',
  },
];
