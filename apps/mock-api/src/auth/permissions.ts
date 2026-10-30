import type { NextFunction, Request, Response } from 'express';
import type { Role } from '@mini-mes/contracts';
import { sendApiError } from '../http/api-error.ts';

/**
 * Справочник «право → роли, которым оно назначено».
 *
 * Источник — документ 6, §9.2–9.3. В учебном контуре четыре роли,
 * и дашборд доступен всем четырём, но механизм проверки должен
 * существовать уже сейчас: в следующих задачах он же будет
 * возвращать 403 для чужих зон (цех/склад).
 */
/** Коды прав учебного контура (документ 6, §9.2). */
export const PERMISSIONS = {
  dashboardRead: 'dashboard.read',
  ordersRead: 'orders.read',
  shopOperate: 'shop.operate',
  shopManage: 'shop.manage',
  warehouseExecute: 'warehouse.execute',
  defectsCreate: 'defects.create',
  notificationsRead: 'notifications.read',
} as const;

/**
 * Матрица «роль → права» (документ 6, §9.3).
 * Держим её как единый объект: так и чтение, и будущие изменения
 * видны в одном месте.
 */
const ROLE_PERMISSIONS: Record<Role, readonly string[]> = {
  shop_master: [
    PERMISSIONS.dashboardRead,
    PERMISSIONS.ordersRead,
    PERMISSIONS.shopOperate,
    PERMISSIONS.shopManage,
    PERMISSIONS.defectsCreate,
    PERMISSIONS.notificationsRead,
  ],
  machine_operator: [
    PERMISSIONS.dashboardRead,
    PERMISSIONS.shopOperate,
    PERMISSIONS.defectsCreate,
    PERMISSIONS.notificationsRead,
  ],
  warehouse: [
    PERMISSIONS.dashboardRead,
    PERMISSIONS.warehouseExecute,
    PERMISSIONS.notificationsRead,
  ],
  manager: [PERMISSIONS.dashboardRead, PERMISSIONS.notificationsRead],
};

/** Есть ли у роли указанное право. */
export const roleHasPermission = (role: Role, permission: string): boolean =>
  ROLE_PERMISSIONS[role].includes(permission);

/**
 * Миддлвар авторизации по правам.
 * Ставится ПОСЛЕ requireAuth: тот уже положил пользователя в req.user.
 *
 * Аналогия: охранник на входе в клуб (requireAuth) пропустил,
 * а этот человек проверяет, пускают ли тебя в конкретную зону.
 *
 * Не раскрываем лишнего: любая причина отказа — одинаковое 403,
 * без деталей «какого именно права не хватило».
 */
export const requirePermissions =
  (...permissions: string[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const role = req.user?.role;
    if (!role) {
      // req.user обязан был поставить requireAuth — защита от неверной
      // расстановки миддлваров в маршруте.
      sendApiError(res, 401, 'AUTH_TOKEN_EXPIRED', 'Требуется авторизация.');
      return;
    }
    const hasAccess = permissions.some((permission) => roleHasPermission(role, permission));
    if (!hasAccess) {
      sendApiError(res, 403, 'FORBIDDEN', 'Недостаточно прав.');
      return;
    }
    next();
  };
