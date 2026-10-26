import type { User } from '@mini-mes/contracts';

/**
 * Пользователи стенда — по одному на роль (документ 6, §9.1).
 * Эти пары логин/пароль будут использоваться на странице входа (спринт 3).
 */
export const users: User[] = [
  {
    id: 'u-master',
    username: 'master',
    password: 'master123',
    fullName: 'Иванов Иван',
    role: 'shop_master',
  },
  {
    id: 'u-operator',
    username: 'operator',
    password: 'operator123',
    fullName: 'Петров Пётр',
    role: 'machine_operator',
  },
  {
    id: 'u-warehouse',
    username: 'warehouse',
    password: 'warehouse123',
    fullName: 'Сидоров Семён',
    role: 'warehouse',
  },
  {
    id: 'u-manager',
    username: 'manager',
    password: 'manager123',
    fullName: 'Кузнецова Анна',
    role: 'manager',
  },
];
