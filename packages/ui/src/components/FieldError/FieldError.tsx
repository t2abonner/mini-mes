import type { ReactNode } from 'react';
import styles from './FieldError.module.css';

export interface FieldErrorProps {
  /** Идентификатор: поле может сослаться через aria-describedby. */
  id?: string;
  /** Текст ошибки. Если не передан, компонент ничего не рендерит. */
  children?: ReactNode;
}

/**
 * Сообщение об ошибке поля.
 *
 * Используется вместе с Input/Textarea: полю ставят `aria-describedby={id}`,
 * и скринридер связывает поле с текстом ошибки. Если `children` не передан
 * (ошибка ещё не возникла), компонент ничего не рендерит — удобно с
 * React Hook Form, где ошибка может быть `undefined`.
 */
export const FieldError = ({ id, children }: FieldErrorProps) => {
  if (!children) {
    return null;
  }

  return (
    <p id={id} className={styles.error}>
      {children}
    </p>
  );
};
