import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'destructive', 'ghost'],
      description: 'Визуальный стиль кнопки',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Размер кнопки',
    },
    loading: { control: { type: 'boolean' }, description: 'Состояние загрузки' },
    disabled: { control: { type: 'boolean' }, description: 'Недоступное состояние' },
  },
  args: {
    children: 'Кнопка',
    variant: 'primary',
    size: 'md',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Удалить' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Loading: Story = {
  args: { variant: 'primary', loading: true, children: 'Сохранение…' },
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ alignItems: 'center', display: 'flex', gap: 12 }}>
      <Button size="sm">Маленькая</Button>
      <Button size="md">Средняя</Button>
      <Button size="lg">Большая</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  name: 'Все варианты (матрица)',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['primary', 'secondary', 'destructive', 'ghost'] as const).map((variant) => (
        <div key={variant} style={{ alignItems: 'center', display: 'flex', gap: 12 }}>
          <span style={{ color: 'var(--color-text-secondary)', width: 110 }}>{variant}</span>
          <Button variant={variant}>Кнопка</Button>
          <Button variant={variant} loading>
            Загрузка
          </Button>
          <Button variant={variant} disabled>
            Недоступна
          </Button>
        </div>
      ))}
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
        display: 'flex',
        gap: 12,
        padding: 24,
      }}
    >
      <Button variant="primary">Кнопка</Button>
      <Button variant="secondary">Кнопка</Button>
      <Button variant="destructive">Удалить</Button>
      <Button variant="ghost">Кнопка</Button>
    </div>
  ),
};
