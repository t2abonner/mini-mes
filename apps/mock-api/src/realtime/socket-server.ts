import { Server } from 'socket.io';
import type { Server as HttpServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { findSessionByAccessToken } from '../auth/session-store.ts';
import { db } from '../db.ts';
import { buildDashboardSummary } from '../dashboard/dashboard.service.ts';
import { roleHasPermission, PERMISSIONS } from '../auth/permissions.ts';
import type { RealtimeEvent } from './types.ts';

export const setupSocketServer = (httpServer: HttpServer): Server => {
  const io = new Server(httpServer, {
    cors: {
      // В боевой системе здесь будут строгие домены.
      // Для локальной разработки и Vite-прокси разрешаем все источники.
      origin: '*',
    },
  });

  // 🔐 Middleware авторизации при рукопожатии (Handshake)
  io.use((socket, next) => {
    // Клиент может передать токен либо в объекте auth, либо в заголовке Authorization
    const rawAuth = socket.handshake.auth?.token;
    const headerAuth = socket.handshake.headers?.authorization;

    const token =
      typeof rawAuth === 'string'
        ? rawAuth
        : typeof headerAuth === 'string' && headerAuth.startsWith('Bearer ')
          ? headerAuth.slice(7)
          : undefined;

    if (!token) {
      return next(new Error('AUTH_TOKEN_EXPIRED'));
    }

    const session = findSessionByAccessToken(token);
    if (!session || Date.now() > session.accessExpiresAt) {
      return next(new Error('AUTH_TOKEN_EXPIRED'));
    }

    const user = db.users.find((u) => u.id === session.userId);
    if (!user) {
      return next(new Error('AUTH_TOKEN_EXPIRED'));
    }

    // Проверяем право на чтение дашборда (документ 6, §14.1)
    if (!roleHasPermission(user.role, PERMISSIONS.dashboardRead)) {
      return next(new Error('FORBIDDEN'));
    }

    // Сохраняем пользователя в контекст сокета для будущих нужд
    socket.data.user = user;
    next(); // Пропускаем дальше
  });

  io.on('connection', (socket) => {
    console.log(`[Socket.IO] Подключился: ${socket.data.user.username} (${socket.id})`);

    // 📦 Отправляем начальный снапшот (документ 6, §14.3)
    const snapshotPayload = {
      summary: buildDashboardSummary(),
      orders: db.orders,
      machines: db.machines,
    };

    const event: RealtimeEvent<typeof snapshotPayload> = {
      eventId: randomUUID(),
      eventType: 'dashboard.initial.snapshot',
      occurredAt: new Date().toISOString(),
      payload: snapshotPayload,
    };

    socket.emit('dashboard.initial.snapshot', event);

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Отключился: ${socket.id}`);
    });
  });

  return io;
};
