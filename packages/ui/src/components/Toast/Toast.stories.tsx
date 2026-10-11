import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './Toast';
import { useToasts } from './use-toast';

const meta: Meta<typeof Toast> = {
  title: 'UI/Toast',
  component: Toast,
};

export default meta;

type Story = StoryObj<typeof Toast>;

/** Одиночный тост: показать и закрыть вручную. */
const SingleToastDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <ToastProvider swipeDirection="right">
      <Button onClick={() => setOpen(true)}>Показать тост</Button>
      <ToastViewport>
        <Toast open={open} onOpenChange={setOpen} variant="success">
          <div>
            <ToastTitle>Сохранено</ToastTitle>
            <ToastDescription>Изменения успешно сохранены.</ToastDescription>
          </div>
          <ToastClose aria-label="Закрыть" />
        </Toast>
      </ToastViewport>
    </ToastProvider>
  );
};

export const Single: Story = {
  name: 'Одиночный тост',
  render: () => <SingleToastDemo />,
};

/** Очередь тостов: несколько одновременно, автозакрытие по таймеру. */
const QueueDemo = () => {
  const { toasts, toast, dismissToast } = useToasts();
  return (
    <ToastProvider swipeDirection="right">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Button
          variant="secondary"
          onClick={() =>
            toast({
              title: 'Файл принят',
              description: 'SAW_PROGRAM.xml добавлен в пакет КД.',
              variant: 'neutral',
            })
          }
        >
          Нейтральный
        </Button>
        <Button
          onClick={() =>
            toast({
              title: 'Операция завершена',
              description: 'Годные детали: 48 шт.',
              variant: 'success',
            })
          }
        >
          Успех
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast({
              title: 'Смена скоро закроется',
              description: 'Осталось 10 минут.',
              variant: 'warning',
            })
          }
        >
          Предупреждение
        </Button>
        <Button
          variant="destructive"
          onClick={() =>
            toast({
              title: 'Зафиксирован брак',
              description: 'Скол кромки, 2 шт.',
              variant: 'destructive',
            })
          }
        >
          Ошибка
        </Button>
      </div>
      <ToastViewport>
        {toasts.map((item) => (
          <Toast
            key={item.id}
            variant={item.variant}
            duration={item.duration ?? 5000}
            onOpenChange={(open) => {
              if (!open) {
                dismissToast(item.id);
              }
            }}
          >
            <div>
              <ToastTitle>{item.title}</ToastTitle>
              {item.description ? <ToastDescription>{item.description}</ToastDescription> : null}
            </div>
            <ToastClose aria-label="Закрыть" />
          </Toast>
        ))}
      </ToastViewport>
    </ToastProvider>
  );
};

export const Queue: Story = {
  name: 'Очередь тостов (показ и автозакрытие)',
  render: () => <QueueDemo />,
};

/** Матрица всех вариантов без автозакрытия (для визуальной сверки). */
const AllVariantsDemo = () => {
  const variants = ['neutral', 'success', 'warning', 'destructive'] as const;
  return (
    <ToastProvider swipeDirection="right">
      <ToastViewport>
        {variants.map((variant) => (
          <Toast key={variant} variant={variant} duration={Number.POSITIVE_INFINITY}>
            <div>
              <ToastTitle>{variant}</ToastTitle>
              <ToastDescription>Семантический вариант тоста.</ToastDescription>
            </div>
            <ToastClose aria-label="Закрыть" />
          </Toast>
        ))}
      </ToastViewport>
    </ToastProvider>
  );
};

export const AllVariants: Story = {
  name: 'Все варианты (матрица)',
  render: () => <AllVariantsDemo />,
};

/** Тёмная тема: ставим тему на <html>, т.к. вьюпорт рендерится порталом. */
const DarkThemeDemo = () => {
  const { toasts, toast, dismissToast } = useToasts();
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.dataset.theme;
    root.dataset.theme = 'dark';
    return () => {
      if (previous === undefined) {
        delete root.dataset.theme;
      } else {
        root.dataset.theme = previous;
      }
    };
  }, []);
  return (
    <ToastProvider swipeDirection="right">
      <Button
        onClick={() =>
          toast({
            title: 'Тёмная тема',
            description: 'Тост читается на тёмном фоне.',
            variant: 'success',
          })
        }
      >
        Показать тост
      </Button>
      <ToastViewport>
        {toasts.map((item) => (
          <Toast
            key={item.id}
            variant={item.variant}
            duration={item.duration ?? 5000}
            onOpenChange={(open) => {
              if (!open) {
                dismissToast(item.id);
              }
            }}
          >
            <div>
              <ToastTitle>{item.title}</ToastTitle>
              {item.description ? <ToastDescription>{item.description}</ToastDescription> : null}
            </div>
            <ToastClose aria-label="Закрыть" />
          </Toast>
        ))}
      </ToastViewport>
    </ToastProvider>
  );
};

export const DarkTheme: Story = {
  name: 'Тёмная тема',
  render: () => <DarkThemeDemo />,
};
