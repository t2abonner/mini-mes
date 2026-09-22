import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Пометить поле как невалидное — применяется стиль ошибки. */
  invalid?: boolean;
}

/**
 * Поле ввода UI-кита Mini-MES.
 *
 * Состояние ошибки задаётся каскадными пользовательскими свойствами (--field-*),
 * которые базовый класс .input потребляет. Это тот же приём, что в Button:
 * один базовый набор стилей, варианты меняют только переменные.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ invalid = false, className, type = 'text', ...rest }, ref) => {
    // noUncheckedIndexedAccess делает доступ к стиля «строка | undefined»,
    // поэтому фильтруем с предикатом типа, чтобы получить ровно string[]
    const classes = [styles.input, invalid ? styles.invalid : undefined, className]
      .filter((value): value is string => Boolean(value))
      .join(' ');

    return (
      <input
        ref={ref}
        type={type}
        className={classes}
        {...rest}
        aria-invalid={invalid || undefined}
      />
    );
  },
);

Input.displayName = 'Input';
