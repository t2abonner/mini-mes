import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import styles from './Dialog.module.css';

export interface DialogProps {
  /** Открыт ли диалог — для контролируемого режима. */
  open?: boolean;
  /** Колбэк смены состояния: закрытие по ESC, оверлею и кнопкам. */
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

/**
 * Корень диалога: управляет состоянием «открыт/закрыт».
 * Без пропа `open` работает неконтролируемо — состояние живёт в Radix.
 */
export const Dialog = ({ open, onOpenChange, children }: DialogProps) => (
  <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
    {children}
  </DialogPrimitive.Root>
);

/**
 * Открывает диалог. Через `asChild` передаёт поведение (клик,
 * aria-haspopup, aria-expanded) дочернему компоненту без лишнего DOM.
 */
export const DialogTrigger = DialogPrimitive.Trigger;

/** Закрывает диалог. В футере обычно оборачивает Button через `asChild`. */
export const DialogClose = DialogPrimitive.Close;

export type DialogContentProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;

/**
 * Содержимое диалога: портал, затемнённый оверлей и само окно
 * со встроенной кнопкой закрытия «×».
 *
 * Поведение обеспечивает Radix, не этот файл: ловушка фокуса,
 * закрытие по ESC, клик по оверлею, блокировка прокрутки страницы,
 * role="dialog", aria-modal и связи заголовка/описания.
 */
export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...rest }, ref) => {
    // noUncheckedIndexedAccess делает доступ к стиля «строка | undefined»,
    // поэтому фильтруем с предикатом типа, чтобы получить ровно string[]
    const classes = [styles.content, className]
      .filter((value): value is string => Boolean(value))
      .join(' ');
    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={styles.overlay} />
        <DialogPrimitive.Content ref={ref} className={classes} {...rest}>
          {children}
          <DialogPrimitive.Close className={styles.close} aria-label="Закрыть">
            <X size={16} aria-hidden="true" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  },
);
DialogContent.displayName = 'DialogContent';

export type DialogSectionProps = HTMLAttributes<HTMLDivElement>;

/** Шапка диалога: колонка с заголовком и описанием. */
export const DialogHeader = ({ className, children, ...rest }: DialogSectionProps) => {
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
 * Заголовок диалога. Обязателен: по нему Radix строит
 * aria-labelledby, без него в консоли будет предупреждение.
 */
export const DialogTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...rest }, ref) => {
  const classes = [styles.title, className]
    .filter((value): value is string => Boolean(value))
    .join(' ');
  return <DialogPrimitive.Title ref={ref} className={classes} {...rest} />;
});
DialogTitle.displayName = 'DialogTitle';

/** Краткое описание под заголовком (aria-describedby). */
export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...rest }, ref) => {
  const classes = [styles.description, className]
    .filter((value): value is string => Boolean(value))
    .join(' ');
  return <DialogPrimitive.Description ref={ref} className={classes} {...rest} />;
});
DialogDescription.displayName = 'DialogDescription';

/** Нижняя зона с действиями, прижата вправо. */
export const DialogFooter = ({ className, children, ...rest }: DialogSectionProps) => {
  const classes = [styles.footer, className]
    .filter((value): value is string => Boolean(value))
    .join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
