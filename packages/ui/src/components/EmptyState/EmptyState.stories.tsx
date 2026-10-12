import type { Meta, StoryObj } from '@storybook/react';

import { SearchX } from 'lucide-react';

import { Button } from '../Button';
import { Card } from '../Card';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'UI/EmptyState',
  component: EmptyState,
  argTypes: {
    title: { control: { type: 'text' }, description: 'Главный текст состояния' },
    description: { control: { type: 'text' }, description: 'Подсказка пользователю' },
  },
  args: {
    title: 'Нет данных',
    description: 'Здесь пока ничего нет.',
  },
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {};

export const WithoutIcon: Story = {
  name: 'Без иконки (icon={null})',
  args: { icon: null },
};

export const WithAction: Story = {
  name: 'С действием',
  render: () => (
    <Card style={{ width: 320 }}>
      <EmptyState
        title="Заказы не найдены"
        description="По заданным фильтрам ничего не нашлось."
        icon={<SearchX size={32} aria-hidden="true" />}
        action={<Button variant="ghost">Сбросить фильтры</Button>}
      />
    </Card>
  ),
};

export const DomainExamples: Story = {
  name: 'Доменные примеры (блоки дашборда)',
  render: () => (
    <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(2, 300px)' }}>
      <Card>
        <EmptyState
          title="Перемещений нет"
          description="Все складские задания на сегодня выполнены."
        />
      </Card>
      <Card>
        <EmptyState
          title="Простоев не зафиксировано"
          description="За текущую смену станки работали без остановок."
          icon={<SearchX size={32} aria-hidden="true" />}
        />
      </Card>
    </div>
  ),
};

export const DarkTheme: Story = {
  name: 'Тёмная тема',
  render: () => (
    <div
      data-theme="dark"
      style={{
        backgroundColor: 'var(--color-background)',
        borderRadius: 8,
        display: 'grid',
        gap: 16,
        gridTemplateColumns: 'repeat(2, 300px)',
        padding: 24,
      }}
    >
      <Card>
        <EmptyState title="Перемещений нет" description="Все задания выполнены." />
      </Card>
      <Card>
        <EmptyState title="Нет данных" description="Тёмная тема читается корректно." />
      </Card>
    </div>
  ),
};
