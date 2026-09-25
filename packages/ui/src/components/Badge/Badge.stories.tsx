import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['neutral', 'primary', 'success', 'warning', 'destructive'],
      description: 'Семантический стиль бейджа',
    },
  },
  args: {
    children: 'Бейдж',
    variant: 'neutral',
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Neutral: Story = {
  args: { variant: 'neutral', children: 'Простой' },
};

export const Primary: Story = {
  args: { variant: 'primary', children: 'В производстве' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Выполнен' },
};

export const Warning: Story = {
  args: { variant: 'warning', children: 'Ожидание материалов' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Критический' },
};

export const AllVariants: Story = {
  name: 'Все варианты (матрица)',
  render: () => (
    <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
      {(['neutral', 'primary', 'success', 'warning', 'destructive'] as const).map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};

export const DomainExamples: Story = {
  name: 'Доменные примеры (статусы Mini-MES)',
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
        <span style={{ color: 'var(--color-text-secondary)', width: 180 }}>Статус заказа</span>
        <Badge variant="warning">Ожидание материалов</Badge>
        <Badge variant="primary">В производстве</Badge>
        <Badge variant="success">Выполнен</Badge>
      </div>
      <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
        <span style={{ color: 'var(--color-text-secondary)', width: 180 }}>Уровень отклонения</span>
        <Badge variant="neutral">Нейтральный</Badge>
        <Badge variant="warning">Предупреждающий</Badge>
        <Badge variant="destructive">Критический</Badge>
      </div>
      <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
        <span style={{ color: 'var(--color-text-secondary)', width: 180 }}>Статус станка</span>
        <Badge variant="success">Работает</Badge>
        <Badge variant="neutral">Простой</Badge>
        <Badge variant="warning">Обслуживание</Badge>
      </div>
    </div>
  ),
};

export const DarkTheme: Story = {
  name: 'Тёмная тема',
  render: () => (
    <div
      data-theme="dark"
      style={{
        alignItems: 'center',
        backgroundColor: 'var(--color-background)',
        borderRadius: 8,
        display: 'flex',
        gap: 8,
        padding: 24,
      }}
    >
      <Badge variant="neutral">Нейтральный</Badge>
      <Badge variant="primary">В производстве</Badge>
      <Badge variant="success">Выполнен</Badge>
      <Badge variant="warning">Предупреждающий</Badge>
      <Badge variant="destructive">Критический</Badge>
    </div>
  ),
};
