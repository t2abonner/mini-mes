import type { Meta, StoryObj } from '@storybook/react';
import { FieldError } from '../FieldError';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  argTypes: {
    invalid: { control: { type: 'boolean' }, description: 'Состояние ошибки поля' },
    disabled: { control: { type: 'boolean' }, description: 'Недоступное состояние' },
  },
  args: {
    placeholder: 'Введите значение',
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Invalid: Story = {
  args: { invalid: true, defaultValue: 'Некорректное значение' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Недоступно' },
};

export const WithFieldError: Story = {
  name: 'С ошибкой поля',
  render: () => (
    <div style={{ display: 'grid', gap: 4, width: 320 }}>
      <label htmlFor="input-error-demo" style={{ color: 'var(--color-text)', fontSize: 14 }}>
        Номер заказа
      </label>
      <Input id="input-error-demo" invalid aria-describedby="input-error-demo-error" />
      <FieldError id="input-error-demo-error">Номер заказа обязателен</FieldError>
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
        gap: 12,
        padding: 24,
        width: 320,
      }}
    >
      <Input placeholder="Обычное поле" />
      <Input invalid defaultValue="Ошибка" />
    </div>
  ),
};
