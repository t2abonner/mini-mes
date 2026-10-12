import type { ReactNode } from 'react';

import styles from './StateShell.module.css';

export interface StateShellProps {
  /** Иконка сверху (обычно иконка lucide размером 32). */
  icon?: ReactNode;
  /** Главный текст состояния. */
  title: ReactNode;
  /** Дополнительное описание (вторичный цвет, ширина до 40 знаков). */
  description?: ReactNode;
  /** Слот действия: кнопка повтора, сброс фильтров и т.п. */
  action?: ReactNode;
  /** Дополнительный класс каркаса (раскладка снаружи). */
  className?: string;
}

/**
 * Внутренний каркас «состояний данных» UI-кита (MM-209).
 *
 * Не экспортируется из корня пакета: это скелет, на котором собираются
 * EmptyState и ErrorState. Благодаря ему состояния данных выглядят
 * единым семейством — критерий готовности задачи.
 */
export const StateShell = ({ icon, title, description, action, className }: StateShellProps) => {
  // noUncheckedIndexedAccess делает доступ к стиля «строка | undefined»,
  // поэтому фильтруем с предикатом типа, чтобы получить ровно string[]
  const classes = [styles.shell, className]
    .filter((value): value is string => Boolean(value))
    .join(' ');

  return (
    <div className={classes}>
      {icon ? <div className={styles.icon}>{icon}</div> : null}
      <div className={styles.title}>{title}</div>
      {description ? <div className={styles.description}>{description}</div> : null}
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
};
