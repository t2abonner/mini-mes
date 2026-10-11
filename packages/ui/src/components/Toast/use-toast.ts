import { useCallback, useMemo, useState } from 'react';
import type { ToastVariant } from './Toast';

/** Тост, лежащий в очереди. */
export interface ToastData {
  /** Уникальный идентификатор тоста. */
  id: string;
  /** Заголовок тоста. */
  title: string;
  /** Дополнительное описание. */
  description?: string;
  /** Семантический вариант. */
  variant: ToastVariant;
  /** Автозакрытие в мс; если не задано — дефолт 5000 мс. */
  duration?: number;
}

/** Аргументы вызова `toast(...)`. */
export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

let toastCounter = 0;

/**
 * Очередь тостов.
 *
 * Возвращает:
 * - `toasts` — текущий список тостов;
 * - `toast(options)` — поставить тост в очередь, возвращает его `id`;
 * - `dismissToast(id)` — убрать тост из очереди.
 *
 * Потребитель сам рендерит `ToastProvider` + `ToastViewport`
 * и мапит `toasts` в компоненты `Toast`.
 */
export function useToasts() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback((options: ToastOptions) => {
    toastCounter += 1;
    const id = `toast-${toastCounter}`;
    setToasts((prev) => [...prev, { id, variant: 'neutral', ...options }]);
    return id;
  }, []);

  return useMemo(() => ({ toasts, toast, dismissToast }), [toasts, toast, dismissToast]);
}
