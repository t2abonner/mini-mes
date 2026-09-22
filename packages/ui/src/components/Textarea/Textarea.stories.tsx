import type { Meta, StoryObj } from '@storybook/react';
import { FieldError } from '../FieldError';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  argTypes: {
    invalid: { control: { type: 'boolean' }, description: 'Состояние ошибки поля' },
    disabled: { control: { type: 'boolean' }, description: 'Недоступное состояние' },
  },
  args: {
    placeholder: 'Введите текст',
    rows: 3,
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const Invalid: Story = {
  args: { invalid: true, defaultValue: 'Некорректный текст' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithFieldError: Story = {
  name: 'С ошибкой поля',
  render: () => (
    <div style={{ display: 'grid', gap: 4, width: 320 }}>
      <label htmlFor="textarea-error-demo" style={{ color: 'var(--color-text)', fontSize: 14 }}>
        Причина брака
      </label>
      <Textarea id="textarea-error-demo" invalid aria-describedby="textarea-error-demo-error" />
      <FieldError id="textarea-error-demo-error">Укажите причину брака</FieldError>
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
      <Textarea placeholder="Обычное поле" />
      <Textarea invalid defaultValue="Ошибка" />
    </div>
  ),
};
