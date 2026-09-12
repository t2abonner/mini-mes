/**
 * Compile-time сверка: типы, выведенные из схем, должны точно совпадать
 * с интерфейсами @mini-mes/contracts. Файл исключён из сборки
 * (см. tsconfig.build.json) и участвует только в `tsc --noEmit`.
 */
import type {
  DeviationLevel as ContractDeviationLevel,
  Machine as ContractMachine,
  MachineStatus as ContractMachineStatus,
  MovementStatus as ContractMovementStatus,
  Order as ContractOrder,
  OrderStatus as ContractOrderStatus,
  ShopTaskStatus as ContractShopTaskStatus,
  Zone as ContractZone,
} from '@mini-mes/contracts';
import type { z } from 'zod';

import { machineSchema } from './machine.ts';
import { orderSchema } from './order.ts';
import {
  deviationLevelSchema,
  machineStatusSchema,
  movementStatusSchema,
  orderStatusSchema,
  shopTaskStatusSchema,
  zoneSchema,
} from './statuses.ts';

/** Точное сравнение типов: `true`, только если `X` и `Y` идентичны. */
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

/** Compile-time «assert»: строка компилируется только при T = true. */
type Expect<T extends true> = T;

type OrderCompat = Expect<Equal<ContractOrder, z.infer<typeof orderSchema>>>;
type MachineCompat = Expect<Equal<ContractMachine, z.infer<typeof machineSchema>>>;
type ZoneCompat = Expect<Equal<ContractZone, z.infer<typeof zoneSchema>>>;
type DeviationCompat = Expect<Equal<ContractDeviationLevel, z.infer<typeof deviationLevelSchema>>>;
type OrderStatusCompat = Expect<Equal<ContractOrderStatus, z.infer<typeof orderStatusSchema>>>;
type MachineStatusCompat = Expect<
  Equal<ContractMachineStatus, z.infer<typeof machineStatusSchema>>
>;
type ShopTaskStatusCompat = Expect<
  Equal<ContractShopTaskStatus, z.infer<typeof shopTaskStatusSchema>>
>;
type MovementStatusCompat = Expect<
  Equal<ContractMovementStatus, z.infer<typeof movementStatusSchema>>
>;

// Файл не создаёт рантайм-значений — только утверждения типов.
export type {
  DeviationCompat,
  MachineCompat,
  MachineStatusCompat,
  MovementStatusCompat,
  OrderCompat,
  OrderStatusCompat,
  ShopTaskStatusCompat,
  ZoneCompat,
};
