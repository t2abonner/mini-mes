import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import styles from './Toast.module.css';

export type ToastVariant = 'neutral' | 'success' | 'warning' | 'destructive';

export interface ToastProps extends ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  /** Семантический вариант тоста. */
  variant?: ToastVariant;
}

/**
 * Провайдер тостов: оборачивает приложение и управляет жизненным циклом.
 * Проп `swipeDirection` задаёт направление свайпа для закрытия.
 */
export const ToastProvider = ToastPrimitive.Provider;

/**
 * Область рендера тостов: фиксированный список в углу экрана.
 * На странице должен быть ровно один вьюпорт.
 */
export const ToastViewport = forwardRef<
  HTMLOListElement,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...rest }, ref) => {
  // noUncheckedIndexedAccess делает доступ к стиля «строка | undefined»,
  // поэтому фильтруем с предикатом типа, чтобы получить ровно string[]
  const classes = [styles.viewport, className]
    .filter((value): value is string => Boolean(value))
    .join(' ');
  return <ToastPrimitive.Viewport ref={ref} className={classes} {...rest} />;
});
ToastViewport.displayName = 'ToastViewport';

/**
 * Сам тост. Варианты задают каскадные переменные (--toast-*),
 * базовый класс .toast их потребляет.
 */
export const Toast = forwardRef<HTMLLIElement, ToastProps>(
  ({ variant = 'neutral', className, children, ...rest }, ref) => {
    const classes = [styles.toast, styles[variant], className]
      .filter((value): value is string => Boolean(value))
      .join(' ');
    return (
      <ToastPrimitive.Root ref={ref} className={classes} {...rest}>
        {children}
      </ToastPrimitive.Root>
    );
  },
);
Toast.displayName = 'Toast';

/** Заголовок тоста. */
export const ToastTitle = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...rest }, ref) => {
  const classes = [styles.title, className]
    .filter((value): value is string => Boolean(value))
    .join(' ');
  return <ToastPrimitive.Title ref={ref} className={classes} {...rest} />;
});
ToastTitle.displayName = 'ToastTitle';

/** Дополнительное описание тоста. */
export const ToastDescription = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...rest }, ref) => {
  const classes = [styles.description, className]
    .filter((value): value is string => Boolean(value))
    .join(' ');
  return <ToastPrimitive.Description ref={ref} className={classes} {...rest} />;
});
ToastDescription.displayName = 'ToastDescription';

/**
 * Кнопка закрытия тоста. По умолчанию рендерит иконку «×»;
 * можно передать собственного ребёнка.
 */
export const ToastClose = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, children, ...rest }, ref) => {
  const classes = [styles.close, className]
    .filter((value): value is string => Boolean(value))
    .join(' ');
  return (
    <ToastPrimitive.Close ref={ref} className={classes} {...rest}>
      {children ?? <X size={16} aria-hidden="true" />}
    </ToastPrimitive.Close>
  );
});
ToastClose.displayName = 'ToastClose';

/**
 * Действие внутри тоста. Проп `altText` обязателен: его объявляет
 * скринридер, когда тост закрылся до нажатия действия.
 */
export const ToastAction = ToastPrimitive.Action;
