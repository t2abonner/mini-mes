import type { HTMLAttributes } from 'react';
import styles from './Card.module.css';

/** Пропсы карточки-контейнера. */
export type CardProps = HTMLAttributes<HTMLDivElement>;

/** Пропсы секций карточки (заголовок, содержимое, футер). */
export type CardSectionProps = HTMLAttributes<HTMLDivElement>;

/**
 * Карточка UI-кита Mini-MES.
 *
 * Составной компонент: Card задаёт «раму» (фон, рамка, скругление),
 * а секции CardHeader / CardTitle / CardContent / CardFooter —
 * внутреннюю раскладку. У самой карточки нет внутренних отступов:
 * так таблицу или список можно разместить вплотную к краям.
 */
export const Card = ({ className, children, ...rest }: CardProps) => {
  // noUncheckedIndexedAccess делает доступ к стиля «строка | undefined»,
  // поэтому фильтруем с предикатом типа, чтобы получить ровно string[]
  const classes = [styles.card, className]
    .filter((value): value is string => Boolean(value))
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

/** Шапка карточки: колонка с заголовком и возможным подзаголовком. */
export const CardHeader = ({ className, children, ...rest }: CardSectionProps) => {
  const classes = [styles.header, className]
    .filter((value): value is string => Boolean(value))
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

/**
 * Заголовок карточки. Рендерится как <div> с типографикой:
 * уровень заголовка (h2/h3/…) зависит от места на странице,
 * поэтому семантику заголовка задаёт потребитель, а не кит.
 */
export const CardTitle = ({ className, children, ...rest }: CardSectionProps) => {
  const classes = [styles.title, className]
    .filter((value): value is string => Boolean(value))
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

/** Основное содержимое карточки с внутренними отступами. */
export const CardContent = ({ className, children, ...rest }: CardSectionProps) => {
  const classes = [styles.content, className]
    .filter((value): value is string => Boolean(value))
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

/** Нижняя зона карточки с действиями, отделённая линией. */
export const CardFooter = ({ className, children, ...rest }: CardSectionProps) => {
  const classes = [styles.footer, className]
    .filter((value): value is string => Boolean(value))
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
