import { forwardRef } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './Select.module.css';

export interface SelectOption {
  /** Значение, которое возвращаем в форму или фильтр. */
  value: string;
  /** Человекочитаемый текст опции. */
  label: string;
  /** Опция видна, но выбрать её нельзя. */
  disabled?: boolean;
}

export interface SelectProps {
  /** Идентификатор триггера: внешний <label> может сослаться через htmlFor. */
  id?: string;
  /** Текущее значение. Компонент контролируемый. */
  value?: string;
  /** Колбэк изменения значения. */
  onValueChange: (value: string) => void;
  /** Список опций. */
  options: SelectOption[];
  /** Текст, если значение ещё не выбрано. */
  placeholder?: string;
  /** Полностью заблокировать компонент. */
  disabled?: boolean;
  /** Пометить поле как невалидное. */
  invalid?: boolean;
  /** Дополнительный класс триггера: раскладка (ширина, выравнивание) снаружи. */
  className?: string;
  /** id элемента с описанием ошибки (FieldError) для связи aria-describedby. */
  ariaDescribedBy?: string;
}

/**
 * Select UI-кита Mini-MES на основе Radix UI.
 *
 * Radix предоставляет доступное поведение из коробки: роли, фокус,
 * клавиатурную навигацию и управление порталом. Мы оборачиваем это
 * в стили на дизайн-токенах и простой API options/value/onValueChange,
 * чтобы компонент удобно использовался в формах и фильтрах дашборда.
 */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      id,
      value,
      onValueChange,
      options,
      placeholder,
      disabled = false,
      invalid = false,
      className,
      ariaDescribedBy,
    },
    ref,
  ) => {
    // noUncheckedIndexedAccess делает доступ к стиля «строка | undefined»,
    // поэтому фильтруем с предикатом типа, чтобы получить ровно string[]
    const classes = [styles.trigger, invalid ? styles.invalid : undefined, className]
      .filter((item): item is string => Boolean(item))
      .join(' ');

    return (
      <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectPrimitive.Trigger
          ref={ref}
          id={id}
          type="button"
          className={classes}
          aria-invalid={invalid || undefined}
          aria-describedby={ariaDescribedBy}
        >
          <SelectPrimitive.Value className={styles.value} placeholder={placeholder} />
          <SelectPrimitive.Icon className={styles.icon}>
            <ChevronDown size={16} aria-hidden="true" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className={styles.content} position="popper" sideOffset={4}>
            <SelectPrimitive.ScrollUpButton className={styles.scrollButton}>
              <ChevronUp size={16} aria-hidden="true" />
            </SelectPrimitive.ScrollUpButton>

            <SelectPrimitive.Viewport className={styles.viewport}>
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={styles.item}
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className={styles.itemIndicator}>
                    <Check size={16} aria-hidden="true" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>

            <SelectPrimitive.ScrollDownButton className={styles.scrollButton}>
              <ChevronDown size={16} aria-hidden="true" />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );
  },
);

Select.displayName = 'Select';
