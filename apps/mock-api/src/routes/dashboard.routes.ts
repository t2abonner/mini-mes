import { Router } from 'express';
import type { Request, Response } from 'express';
import { requireAuth } from '../auth/require-auth.ts';
import { PERMISSIONS, requirePermissions } from '../auth/permissions.ts';
import {
  buildDashboardSummary,
  buildMachinesPage,
  buildOrdersPage,
  parsePagination,
} from '../dashboard/dashboard.service.ts';

export const dashboardRouter = Router();

/**
 * Все три эндпоинта дашборда защищены одинаково:
 * 1) requireAuth — кто ты (401, если токен не тот);
 * 2) requirePermissions — а тебе можно (403, если права нет).
 *
 * Порядок миддлваров ВАЖЕН: права читают req.user,
 * который ставит requireAuth.
 */

/** GET /api/v1/dashboard/summary — сводная статистика. */
dashboardRouter.get(
  '/summary',
  requireAuth,
  requirePermissions(PERMISSIONS.dashboardRead),
  (_req: Request, res: Response) => {
    res.json(buildDashboardSummary());
  },
);

/**
 * GET /api/v1/dashboard/orders — карточки заказов с пагинацией.
 * Формат конверта — документ 3, §15.2; карточка — §16.1.
 */
dashboardRouter.get(
  '/orders',
  requireAuth,
  requirePermissions(PERMISSIONS.dashboardRead),
  (req: Request, res: Response) => {
    // req.query у Express типизирован как производная от строки;
    // приведение к записи безопасно, потому что мы только читаем.
    const pagination = parsePagination(req.query as Record<string, unknown>);
    res.json(buildOrdersPage(pagination));
  },
);

/** GET /api/v1/dashboard/machines — панель станков. */
dashboardRouter.get(
  '/machines',
  requireAuth,
  requirePermissions(PERMISSIONS.dashboardRead),
  (_req: Request, res: Response) => {
    res.json(buildMachinesPage());
  },
);
