import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import styles from './Tabs.module.css';

/**
 * Вкладки UI-кита на основе Radix UI.
 *
 * Это составной компонент: потребитель сам собирает разметку из
 * Tabs / TabsList / TabsTrigger / TabsContent — как Card или Dialog.
 * Radix обеспечивает доступность из коробки: роли tablist/tab/tabpanel,
 * aria-связи триггеров и панелей, клавиатурную навигацию стрелками.
 *
 * Типы пропов не описываем руками, а заимствуем у примитивов через
 * ComponentPropsWithoutRef: источник правды — сама библиотека,
 * синхронизировать ничего не нужно.
 */

export type TabsProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Root>;
export type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List>;
export type TabsTriggerProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>;
export type TabsContentProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;

/**
 * Корень вкладок: управляет активной вкладкой.
 * Без пропа `value` работает неконтролируемо (задай `defaultValue`),
 * с `value` + `onValueChange` — контролируемо.
 * Проп `orientation` влияет только на клавиатуру:
 * горизонтальные вкладки листаются стрелками ← →, вертикальные — ↑ ↓.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(({ className, ...rest }, ref) => {
  // noUncheckedIndexedAccess делает доступ к стиля «строка | undefined»,
  // поэтому фильтруем с предикатом типа, чтобы получить ровно string[]
  const classes = [styles.root, className]
    .filter((value): value is string => Boolean(value))
    .join(' ');
  return <TabsPrimitive.Root ref={ref} className={classes} {...rest} />;
});
Tabs.displayName = 'Tabs';

/**
 * Полоса вкладок: содержит один или несколько TabsTrigger.
 * Роль `tablist` Radix проставляет сам.
 */
export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(({ className, ...rest }, ref) => {
  const classes = [styles.list, className]
    .filter((value): value is string => Boolean(value))
    .join(' ');
  return <TabsPrimitive.List ref={ref} className={classes} {...rest} />;
});
TabsList.displayName = 'TabsList';

/**
 * Кнопка вкладки. Роль `tab`, `aria-selected` и атрибут
 * `data-state="active" | "inactive"` выставляет Radix —
 * на них опираются и скринридеры, и наши стили.
 * Проп `value` обязателен: именно им триггер связывается с панелью.
 */
export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, ...rest }, ref) => {
    const classes = [styles.trigger, className]
      .filter((value): value is string => Boolean(value))
      .join(' ');
    return <TabsPrimitive.Trigger ref={ref} className={classes} {...rest} />;
  },
);
TabsTrigger.displayName = 'TabsTrigger';

/**
 * Панель содержимого: видима, только когда её вкладка активна.
 * Radix связывает панель с триггером через `aria-labelledby`
 * и сам управляет скрытием неактивных панелей.
 * Панель получает фокус с клавиатуры (после вкладок по Tab),
 * поэтому в стилях ей положено кольцо :focus-visible.
 */
export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, ...rest }, ref) => {
    const classes = [styles.content, className]
      .filter((value): value is string => Boolean(value))
      .join(' ');
    return <TabsPrimitive.Content ref={ref} className={classes} {...rest} />;
  },
);
TabsContent.displayName = 'TabsContent';
