import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Визуальный стиль кнопки. */
  variant?: ButtonVariant;
  /** Размер кнопки. */
  size?: ButtonSize;
  /** Состояние загрузки: кнопка блокируется и показывается спиннер. */
  loading?: boolean;
}

/**
 * Кнопка UI-кита Mini-MES.
 *
 * Варианты задают каскадные пользовательские свойства (--btn-*),
 * а базовый класс .button их потребляет. Это один базовый набор стилей
 * без дублирования на каждый вариант.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      className,
      children,
      type = 'button',
      ...rest
    },
    ref,
  ) => {
    // noUncheckedIndexedAccess делает доступ к стиля «строка | undefined»,
    // поэтому фильтруем с предикатом типа, чтобы получить ровно string[]
    const classes = [styles.button, styles[variant], styles[size], className]
      .filter((value): value is string => Boolean(value))
      .join(' ');

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...rest}
      >
        {loading ? <span className={styles.spinner} aria-hidden="true" /> : null}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
