import type { Role } from './roles';

/**
 * Публичный профиль пользователя — то, что сервер возвращает клиенту.
 * Пароль намеренно отсутствует: контракт не должен знать о секретах.
 */
export interface AuthUser {
  id: string;
  username: string;
  fullName: string;
  role: Role;
}

/** Тело запроса на вход. */
export interface LoginRequest {
  username: string;
  password: string;
}

/** Ответ на успешный вход: пара токенов + профиль. */
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

/** Ответ на обновление: новый access-токен + профиль. */
export interface RefreshResponse {
  accessToken: string;
  user: AuthUser;
}
