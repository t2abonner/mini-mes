import type { Role } from './roles';

/**
 * Пользователь мок-сервера (документ 6, §10.1).
 *
 * Пароль хранится в открытом виде — осознанное упрощение
 * учебного контура (документ 6, §17.1). В реальную систему
 * это решение переносить нельзя.
 */
export interface User {
  id: string;
  username: string;
  password: string;
  fullName: string;
  role: Role;
}
