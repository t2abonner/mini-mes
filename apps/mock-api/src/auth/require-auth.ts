import type { NextFunction, Request, Response } from 'express';
import type { User } from '@mini-mes/contracts';
import { db } from '../db.ts';
import type { Session } from '../db.ts';
import { sendApiError } from '../http/api-error.ts';
import { findSessionByAccessToken } from './session-store.ts';

/**
 * Расширяем тип запроса: после успешной проверки мидлвар кладёт сюда
 * пользователя и сессию, и обработчики ниже читают их без повторного поиска.
 */
declare module 'express' {
  interface Request {
    user?: User;
    authSession?: Session;
  }
}

/**
 * Достаёт токен из заголовка `Authorization: Bearer <token>`.
 * Возвращает `undefined`, если заголовка нет или формат не тот.
 */
const extractBearerToken = (req: Request): string | undefined => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return undefined;
  }
  return header.slice('Bearer '.length).trim() || undefined;
};

/**
 * Мидлвар аутентификации: проверяет access-токен.
 *
 * Все причины отказа сводим к одному ответу 401 с кодом
 * `AUTH_TOKEN_EXPIRED`: для клиента безразлично, истёк токен,
 * отозван или никогда не выдавался — он просто идёт обновляться.
 */
export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const token = extractBearerToken(req);
  if (!token) {
    sendApiError(res, 401, 'AUTH_TOKEN_EXPIRED', 'Токен отсутствует или недействителен.');
    return;
  }

  const session = findSessionByAccessToken(token);
  if (!session) {
    sendApiError(res, 401, 'AUTH_TOKEN_EXPIRED', 'Токен недействителен.');
    return;
  }

  if (Date.now() > session.accessExpiresAt) {
    sendApiError(res, 401, 'AUTH_TOKEN_EXPIRED', 'Токен истёк.');
    return;
  }

  const user = db.users.find((candidate) => candidate.id === session.userId);
  if (!user) {
    // Пользователь «исчез» (в реальном бэкенде — деактивирован):
    // сессию тоже считаем недействительной.
    sendApiError(res, 401, 'AUTH_TOKEN_EXPIRED', 'Токен недействителен.');
    return;
  }

  req.user = user;
  req.authSession = session;
  next();
};
