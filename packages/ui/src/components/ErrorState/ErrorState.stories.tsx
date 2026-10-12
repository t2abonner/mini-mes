import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '../Card';
import { ErrorState } from './ErrorState';

const meta: Meta<typeof ErrorState> = {
  title: 'UI/ErrorState',
  component: ErrorState,
  argTypes: {
    title: { control: { type: 'text' }, description: 'Главный текст ошибки' },
    description: { control: { type: 'text' }, description: 'Детали ошибки' },
    retryLabel: { control: { type: 'text' }, description: 'Текст кнопки повтора' },
  },
  args: {
    description: 'Сервер недоступен. Проверьте соединение и повторите попытку.',
  },
};

export default meta;

type Story = StoryObj<typeof ErrorState>;

export const Default: Story = {};

/**
 * Кнопка повтора считает попытки — видно, что колбэк действительно
 * вызывается. Хуки живут внутри настоящего компонента (правила хуков).
 */
const RetryDemo = () => {
  const [attempts, setAttempts] = useState(0);
  return (
    <div style={{ display: 'grid', gap: 8, width: 360 }}>
      <Card>
        <ErrorState
          title="Не удалось загрузить заказы"
          description="Сервер недоступен. Проверьте соединение и повторите попытку."
          onRetry={() => setAttempts((prev) => prev + 1)}
        />
      </Card>
      <p style={{ color: 'var(--color-text-secondary)', margin: 0, textAlign: 'center' }}>
        Попыток повтора: {attempts}
      </p>
    </div>
  );
};

export const WithRetry: Story = {
  name: 'С кнопкой повтора',
  render: () => <RetryDemo />,
};

export const DomainExample: Story = {
  name: 'Доменный пример (блок сводки дашборда)',
  render: () => (
    <Card style={{ width: 360 }}>
      <ErrorState
        title="Не удалось загрузить сводку"
        description="Истекло время ожидания ответа от сервера."
        onRetry={() => {}}
      />
    </Card>
  ),
};

export const DarkTheme: Story = {
  name: 'Тёмная тема',
  render: () => (
    <div
      data-theme="dark"
      style={{ backgroundColor: 'var(--color-background)', borderRadius: 8, padding: 24 }}
    >
      <Card style={{ width: 360 }}>
        <ErrorState description="Сервер недоступен." onRetry={() => {}} />
      </Card>
    </div>
  ),
};
