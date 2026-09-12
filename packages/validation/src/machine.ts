import { z } from 'zod';

import { machineStatusSchema, zoneSchema } from './statuses.ts';

/**
 * Станок (документ 6, §10.3; станочный парк стенда — §10.5).
 */
export const machineSchema = z
  .object({
    id: z.string().min(1),
    code: z.string().min(1),
    name: z.string().min(1),
    model: z.string().min(1),
    zone: zoneSchema,
    status: machineStatusSchema,
    /** Текущий заказ — только если станок что-то обрабатывает. */
    orderId: z.string().min(1).optional(),
    /** Текущая партия — присутствует вместе с orderId. */
    batchNumber: z.number().int().positive().optional(),
  })
  .superRefine((machine, ctx) => {
    // Кросс-полевые инварианты контракта (§10.3): у работающего станка
    // должен быть заказ; партия указывается только вместе с заказом.
    if (machine.status === 'running' && machine.orderId === undefined) {
      ctx.addIssue({
        code: 'custom',
        path: ['orderId'],
        message: 'У станка в статусе «Работает» должен быть указан текущий заказ',
      });
    }
    if (machine.batchNumber !== undefined && machine.orderId === undefined) {
      ctx.addIssue({
        code: 'custom',
        path: ['batchNumber'],
        message: 'Партия указывается только вместе с текущим заказом',
      });
    }
  });

export type Machine = z.infer<typeof machineSchema>;
