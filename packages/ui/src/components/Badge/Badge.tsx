import type { HTMLAttributes } from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'destructive';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Семантический стиль бейджа. */
  variant?: BadgeVariant;
}

/**
 * Бейдж UI-кита Mini-MES: короткий статусный индикатор.
 *
 * Варианты задают каскадные пользовательские свойства (--badge-*),
 * которые потребляет базовый класс .badge. Семантика вариантов
 * согласована с доменом: статусы заказа и станков, уровни отклонения.
 */
export const Badge = ({ variant = 'neutral', className, children, ...rest }: BadgeProps) => {
  // noUncheckedIndexedAccess делает доступ к стиля «строка | undefined»,
  // поэтому фильтруем с предикатом типа, чтобы получить ровно string[]
  const classes = [styles.badge, styles[variant], className]
    .filter((value): value is string => Boolean(value))
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
};
