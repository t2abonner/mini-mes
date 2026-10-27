import { Router } from 'express';
import type { Request, Response } from 'express';
import type { AuthResponse, AuthUser, LoginRequest, RefreshResponse } from '@mini-mes/contracts';
import { requireAuth } from '../auth/require-auth.ts';
import {
  createSession,
  destroySession,
  findSessionByRefreshToken,
  rotateAccessToken,
} from '../auth/session-store.ts';
import { db } from '../db.ts';
import { sendApiError } from '../http/api-error.ts';

/**
 * Собирает публичный профиль: то, что можно отдавать клиенту.
 * Пароль намеренно отбрасываем.
 */
const toAuthUser = (user: (typeof db.users)[number]): AuthUser => ({
  id: user.id,
  username: user.username,
  fullName: user.fullName,
  role: user.role,
});

export const authRouter = Router();

/**
 * POST /api/v1/auth/login
 * Один и тот же 401 и для «нет такого пользователя», и для «неверный пароль»:
 * не раскрываем существование логинов.
 */
authRouter.post('/login', (req: Request, res: Response) => {
  const body = (req.body ?? {}) as Partial<LoginRequest>;
  const { username, password } = body;

  if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
    sendApiError(res, 400, 'VALIDATION_ERROR', 'Поля «username» и «password» обязательны.');
    return;
  }

  const user = db.users.find(
    (candidate) => candidate.username === username && candidate.password === password,
  );

  if (!user) {
    sendApiError(res, 401, 'AUTH_INVALID_CREDENTIALS', 'Неверный логин или пароль.');
    return;
  }

  const session = createSession(user.id);
  const response: AuthResponse = {
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
    user: toAuthUser(user),
  };
  res.json(response);
});

/**
 * POST /api/v1/auth/refresh
 * Выпускает новый access-токен по действительному refresh-токену.
 *
 * Учебное упрощение: клиент передаёт refresh-токен в том же заголовке
 * `Authorization: Bearer <refreshToken>`. В реальном бэкенде он чаще
 * живёт в HttpOnly cookie.
 */
authRouter.post('/refresh', (req: Request, res: Response) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    sendApiError(res, 401, 'AUTH_TOKEN_EXPIRED', 'Refresh-токен не передан.');
    return;
  }
  const refreshToken = header.slice('Bearer '.length).trim();

  const session = findSessionByRefreshToken(refreshToken);
  if (!session || Date.now() > session.refreshExpiresAt) {
    sendApiError(res, 401, 'AUTH_TOKEN_EXPIRED', 'Refresh-токен недействителен или истёк.');
    return;
  }

  const user = db.users.find((candidate) => candidate.id === session.userId);
  if (!user) {
    sendApiError(res, 401, 'AUTH_TOKEN_EXPIRED', 'Пользователь не найден.');
    return;
  }

  const updated = rotateAccessToken(session);
  const response: RefreshResponse = {
    accessToken: updated.accessToken,
    user: toAuthUser(user),
  };
  res.json(response);
});

/**
 * GET /api/v1/auth/me
 * Текущий пользователь и роль. Защищённый эндпоинт:
 * `requireAuth` уже положил пользователя в `req.user`.
 */
authRouter.get('/me', requireAuth, (req: Request, res: Response) => {
  if (!req.user) {
    sendApiError(res, 401, 'AUTH_TOKEN_EXPIRED', 'Токен недействителен.');
    return;
  }
  res.json(toAuthUser(req.user));
});

/**
 * POST /api/v1/auth/logout
 * Отзыв сессии: оба токена становятся недействительными.
 */
authRouter.post('/logout', requireAuth, (req: Request, res: Response) => {
  if (req.authSession) {
    destroySession(req.authSession);
  }
  res.status(204).send();
});
