import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import styles from './Textarea.module.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Пометить поле как невалидное — применяется стиль ошибки. */
  invalid?: boolean;
}

/**
 * Многострочное поле ввода UI-кита Mini-MES.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ invalid = false, className, ...rest }, ref) => {
    const classes = [styles.textarea, invalid ? styles.invalid : undefined, className]
      .filter((value): value is string => Boolean(value))
      .join(' ');

    return <textarea ref={ref} className={classes} {...rest} aria-invalid={invalid || undefined} />;
  },
);

Textarea.displayName = 'Textarea';
