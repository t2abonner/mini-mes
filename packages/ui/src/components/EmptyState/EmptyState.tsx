import type { ReactNode } from 'react';

import { Inbox } from 'lucide-react';

import { StateShell } from '../StateShell';

export interface EmptyStateProps {
  /** Главный текст: что именно не найдено. */
  title: string;
  /** Подсказка пользователю (вторичный цвет). */
  description?: ReactNode;
  /** Иконка состояния; по умолчанию «входящие» (32px). `icon={null}` убирает иконку. */
  icon?: ReactNode;
  /** Слот действия: например, кнопка «Сбросить фильтры». */
  action?: ReactNode;
  /** Дополнительный класс каркаса (раскладка снаружи). */
  className?: string;
}

/**
 * Пустое состояние данных UI-кита (MM-209): «данных нет, и это
 * нормальная ситуация» (пустой список после фильтров, нет перемещений).
 * Собирается на общем каркасе StateShell — единое семейство с Loader
 * и ErrorState.
 */
export const EmptyState = ({ title, description, icon, action, className }: EmptyStateProps) => (
  <StateShell
    className={className}
    icon={icon === undefined ? <Inbox size={32} aria-hidden="true" /> : icon}
    title={title}
    description={description}
    action={action}
  />
);
