import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Input } from '../Input';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  name: 'Неконтролируемый диалог',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Открыть диалог</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Подтверждение действия</DialogTitle>
          <DialogDescription>
            Диалог закрывается четырьмя способами: клавиша ESC, клик по затемнённому оверлею,
            крестик в углу, кнопка в футере.
          </DialogDescription>
        </DialogHeader>
        <p style={{ margin: 0 }}>
          Содержимое может быть любым: текст, формы, таблицы. В спринте 4 в таком диалоге откроется
          таймлайн заказа.
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Отмена</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Подтвердить</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Контролируемый режим: состояние живёт вне диалога.
 * Так приложение будет открывать таймлайн заказа из таблицы дашборда.
 */
const ControlledDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ alignItems: 'center', display: 'flex', gap: 12 }}>
      <Button onClick={() => setOpen(true)}>Открыть из кода</Button>
      <span style={{ color: 'var(--color-text-secondary)' }}>open = {String(open)}</span>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Контролируемый диалог</DialogTitle>
            <DialogDescription>
              Состоянием владеет родитель: и открытие, и закрытие проходят через onOpenChange.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Отмена</Button>
            </DialogClose>
            <Button onClick={() => setOpen(false)}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const Controlled: Story = {
  name: 'Контролируемый (внешнее состояние)',
  render: () => <ControlledDemo />,
};

/**
 * Демонстрация ловушки фокуса: внутри несколько фокусируемых
 * элементов, и Tab циклически обходит их, не выходя наружу.
 */
const FocusTrapDemo = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Открыть форму</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Завершение операции</DialogTitle>
        <DialogDescription>
          Фокус заперт внутри: нажимайте Tab — он циклически обходит поля и кнопки и не выходит за
          пределы окна. При закрытии фокус вернётся на кнопку-триггер.
        </DialogDescription>
      </DialogHeader>
      <div style={{ display: 'grid', gap: 12 }}>
        <label style={{ display: 'grid', gap: 4 }} htmlFor="dialog-good-qty">
          <span style={{ fontSize: 14 }}>Годные детали, шт</span>
          <Input id="dialog-good-qty" defaultValue="48" />
        </label>
        <label style={{ display: 'grid', gap: 4 }} htmlFor="dialog-defect-qty">
          <span style={{ fontSize: 14 }}>Брак, шт</span>
          <Input id="dialog-defect-qty" defaultValue="2" />
        </label>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary">Отмена</Button>
        </DialogClose>
        <Button>Сохранить</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const FocusTrap: Story = {
  name: 'Ловушка фокуса (форма внутри)',
  render: () => <FocusTrapDemo />,
};

/** Длинное содержимое: окно ограничено по высоте и прокручивается. */
const ScrollableDemo = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="secondary">Открыть длинный диалог</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Журнал событий смены</DialogTitle>
        <DialogDescription>
          Окно не растягивается выше 80% высоты экрана: прокрутите содержимое.
        </DialogDescription>
      </DialogHeader>
      <ol style={{ display: 'grid', gap: 8, margin: 0, paddingInlineStart: 20 }}>
        {Array.from({ length: 30 }, (_, index) => (
          <li key={index}>Событие № {index + 1}: партия передана в зону кромления</li>
        ))}
      </ol>
    </DialogContent>
  </Dialog>
);

export const Scrollable: Story = {
  name: 'Прокрутка длинного содержимого',
  render: () => <ScrollableDemo />,
};

/** Макет будущего таймлайна заказа из дашборда (спринт 4). */
const TimelineDemo = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost">История заказа</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Заказ-000123 · ИП Петров</DialogTitle>
        <DialogDescription>Хронология статусов заказа</DialogDescription>
      </DialogHeader>
      <ol style={{ display: 'grid', gap: 8, margin: 0, paddingInlineStart: 20 }}>
        <li>08:00 — заказ получил статус «К производству»</li>
        <li>09:15 — материалы поступили на склад</li>
        <li>09:40 — материалы переданы в цех</li>
        <li>10:02 — начата обработка в зоне раскроя</li>
        <li>11:35 — завершена обработка в зоне раскроя</li>
        <li>11:50 — начата обработка в зоне кромления</li>
      </ol>
    </DialogContent>
  </Dialog>
);

export const DomainExample: Story = {
  name: 'Доменный пример (таймлайн заказа)',
  render: () => <TimelineDemo />,
};

/**
 * Portal рендерит содержимое диалога в document.body, то есть ВНЕ
 * обёртки с data-theme. Поэтому тема ставится на <html> — так же,
 * как это делает приложение (и как в истории Select из MM-205).
 */
const DarkThemeDemo = () => {
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
    <div
      style={{
        backgroundColor: 'var(--color-background)',
        borderRadius: 8,
        padding: 24,
      }}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button>Открыть в тёмной теме</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Тёмная тема</DialogTitle>
            <DialogDescription>
              Оверлей, окно и все секции читаются в тёмной теме.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Закрыть</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const DarkTheme: Story = {
  name: 'Тёмная тема',
  render: () => <DarkThemeDemo />,
};
