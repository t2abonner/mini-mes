import styles from './Loader.module.css';

export type LoaderSize = 'sm' | 'md' | 'lg';

export interface LoaderProps {
  /** Размер спиннера: 16 / 24 / 32 px. */
  size?: LoaderSize;
  /** Видимая подпись под спиннером. Если не задана, скринридеру всё равно сообщается «Загрузка…». */
  label?: string;
  /** Дополнительный класс каркаса (раскладка снаружи). */
  className?: string;
}

/**
 * Лоадер UI-кита Mini-MES: индикатор загрузки данных (MM-209).
 *
 * Каркас (центрирование, отступы) совпадает со скелетом EmptyState и
 * ErrorState, поэтому три состояния данных выглядят единым семейством.
 * Контейнер имеет role="status": скринридер вежливо сообщит о загрузке,
 * не прерывая текущее занятие пользователя.
 */
export const Loader = ({ size = 'md', label, className }: LoaderProps) => {
  // noUncheckedIndexedAccess делает доступ к стиля «строка | undefined»,
  // поэтому фильтруем с предикатом типа, чтобы получить ровно string[]
  const classes = [styles.loader, className]
    .filter((value): value is string => Boolean(value))
    .join(' ');
  const spinnerClasses = [styles.spinner, styles[size]]
    .filter((value): value is string => Boolean(value))
    .join(' ');

  return (
    <div className={classes} role="status" aria-live="polite">
      <span className={spinnerClasses} aria-hidden="true" />
      {label ? (
        <span className={styles.label}>{label}</span>
      ) : (
        <span className={styles.visuallyHidden}>Загрузка…</span>
      )}
    </div>
  );
};
