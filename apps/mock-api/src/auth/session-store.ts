import { ACCESS_TOKEN_TTL_MS, REFRESH_TOKEN_TTL_MS } from '../config.ts';
import { db } from '../db.ts';
import type { Session } from '../db.ts';
import { generateToken } from './tokens.ts';

/**
 * Хранилище сессий авторизации.
 *
 * Истёкшие сессии не удаляются автоматически — для учебного стенда
 * достаточно очистки при перезапуске процесса. В реальном бэкенде
 * нужен фоновый воркер для периодической очистки или TTL в Redis.
 */

/** Создаёт новую сессию для пользователя и кладёт её в хранилище. */
export const createSession = (userId: string): Session => {
  const now = Date.now();
  const session: Session = {
    accessToken: generateToken(),
    refreshToken: generateToken(),
    userId,
    accessExpiresAt: now + ACCESS_TOKEN_TTL_MS,
    refreshExpiresAt: now + REFRESH_TOKEN_TTL_MS,
    createdAt: now,
  };
  db.sessions.push(session);
  return session;
};

/** Ищет живую сессию по access-токену. */
export const findSessionByAccessToken = (token: string): Session | undefined =>
  db.sessions.find((session) => session.accessToken === token);

/** Ищет живую сессию по refresh-токену. */
export const findSessionByRefreshToken = (token: string): Session | undefined =>
  db.sessions.find((session) => session.refreshToken === token);

/**
 * Выпускает новый access-токен в существующей сессии.
 * Refresh остаётся прежним на всё время жизни сессии —
 * ротация происходит только для короткоживущего access.
 */
export const rotateAccessToken = (session: Session): Session => {
  const updated: Session = {
    ...session,
    accessToken: generateToken(),
    accessExpiresAt: Date.now() + ACCESS_TOKEN_TTL_MS,
  };
  const index = db.sessions.indexOf(session);
  if (index !== -1) {
    db.sessions[index] = updated;
  }
  return updated;
};

/** Удаляет сессию (выход). После этого оба токена недействительны. */
export const destroySession = (session: Session): void => {
  const index = db.sessions.indexOf(session);
  if (index !== -1) {
    db.sessions.splice(index, 1);
  }
};
