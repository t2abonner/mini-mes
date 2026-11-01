import { Server } from 'socket.io';
import { randomUUID } from 'node:crypto';
import { db } from '../db.ts';
import { buildDashboardSummary } from '../dashboard/dashboard.service.ts';
import type { RealtimeEvent } from './types.ts';

/** Вспомогательная функция для эмита событий в едином формате */
const emitEvent = <T>(io: Server, eventType: string, payload: T) => {
  const event: RealtimeEvent<T> = {
    eventId: randomUUID(),
    eventType,
    occurredAt: new Date().toISOString(),
    payload,
  };
  io.emit(eventType, event);
};

export const startSimulator = (io: Server) => {
  console.log('[Simulator] Запущен таймер цеха (интервал ~10 сек)');

  setInterval(() => {
    const activeOrders = db.orders.filter((o) => o.status === 'in_production');

    // Сценарий 1: Прогресс производства (с вероятностью 70%)
    if (activeOrders.length > 0 && Math.random() < 0.7) {
      const randomIndex = Math.floor(Math.random() * activeOrders.length);
      const order = activeOrders[randomIndex];

      // Guard clause: защита от noUncheckedIndexedAccess.
      // На практике массив не пустой (мы проверили length > 0),
      // но TypeScript требует явной проверки.
      if (!order) return;

      const increment = Math.floor(Math.random() * 5) + 1;

      // Инкрементируем годные детали, но не больше плана
      order.goodQty = Math.min(order.totalPlannedQty, order.goodQty + increment);
      order.progressPercent = Math.round((order.goodQty / order.totalPlannedQty) * 1000) / 10;

      emitEvent(io, 'dashboard.order.updated', order);
      emitEvent(io, 'dashboard.summary.updated', buildDashboardSummary());
    }

    // Сценарий 2: Изменение статуса случайного станка (с вероятностью 40%)
    if (Math.random() < 0.4) {
      const randomIndex = Math.floor(Math.random() * db.machines.length);
      const machine = db.machines[randomIndex];

      // Guard clause: если массив машин пустой — пропускаем тик.
      if (!machine) return;

      const isRunning = machine.status === 'running';

      if (isRunning) {
        // Останавливаем или ломаем
        machine.status = Math.random() > 0.5 ? 'idle' : 'maintenance';
        machine.orderId = undefined;
        machine.batchNumber = undefined;
      } else if (activeOrders.length > 0) {
        // Запускаем, если есть активные заказы (соблюдаем инварианты контракта!)
        machine.status = 'running';
        const firstOrder = activeOrders[0];
        if (firstOrder) {
          machine.orderId = firstOrder.id;
          machine.batchNumber = 1;
        }
      }

      emitEvent(io, 'dashboard.machine.updated', machine);
      emitEvent(io, 'dashboard.summary.updated', buildDashboardSummary());
    }

    // Сценарий 3: Фиксация брака (с вероятностью 15%, документ 6, §8.6)
    if (Math.random() < 0.15 && activeOrders.length > 0) {
      const randomIndex = Math.floor(Math.random() * activeOrders.length);
      const order = activeOrders[randomIndex];

      // Guard clause: та же защита, что и в сценарии 1
      if (!order) return;

      const defectQty = Math.floor(Math.random() * 3) + 1;
      order.defectQty += defectQty;

      emitEvent(io, 'dashboard.order.updated', order);
      emitEvent(io, 'dashboard.summary.updated', buildDashboardSummary());

      emitEvent(io, 'dashboard.defect.created', {
        orderId: order.id,
        quantity: defectQty,
        reason: 'Скол кромки (симуляция)',
      });

      emitEvent(io, 'notification.created', {
        id: randomUUID(),
        title: 'Зафиксирован брак',
        message: `Заказ ${order.number}: ${defectQty} шт.`,
        isRead: false,
        createdAt: new Date().toISOString(),
      });
    }
  }, 10_000); // 10 секунд
};
