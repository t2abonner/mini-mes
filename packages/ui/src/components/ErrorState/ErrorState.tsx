import type { ReactNode } from 'react';

import { RefreshCw, TriangleAlert } from 'lucide-react';

import { Button } from '../Button';
import { StateShell } from '../StateShell';

export interface ErrorStateProps {
  /** Главный текст ошибки. По умолчанию — нейтральный заголовок. */
  title?: string;
  /** Детали ошибки (вторичный цвет). */
  description?: ReactNode;
  /** Колбэк повтора: если передан, появляется кнопка «Повторить». */
  onRetry?: () => void;
  /** Текст кнопки повтора (по умолчанию «Повторить»). */
  retryLabel?: string;
  /** Иконка состояния; по умолчанию предупреждение (32px). `icon={null}` убирает иконку. */
  icon?: ReactNode;
  /** Дополнительный класс каркаса (раскладка снаружи). */
  className?: string;
}

/**
 * Состояние ошибки UI-кита (MM-209): запрос не удался, предлагаем
 * повторить. Собирается на общем каркасе StateShell — единое семейство
 * с Loader и EmptyState. Кнопка повтора берётся из своего же кита:
 * композиция компонентов пакета.
 */
export const ErrorState = ({
  title = 'Не удалось загрузить данные',
  description,
  onRetry,
  retryLabel = 'Повторить',
  icon,
  className,
}: ErrorStateProps) => (
  <StateShell
    className={className}
    icon={icon === undefined ? <TriangleAlert size={32} aria-hidden="true" /> : icon}
    title={title}
    description={description}
    action={
      onRetry ? (
        <Button variant="secondary" onClick={onRetry}>
          <RefreshCw size={16} aria-hidden="true" />
          {retryLabel}
        </Button>
      ) : undefined
    }
  />
);
