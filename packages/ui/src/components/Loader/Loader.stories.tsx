import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '../Card';
import { EmptyState } from '../EmptyState';
import { ErrorState } from '../ErrorState';
import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'UI/Loader',
  component: Loader,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Размер спиннера',
    },
    label: { control: { type: 'text' }, description: 'Видимая подпись под спиннером' },
  },
  args: { size: 'md' },
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: 'Загрузка заказов…' },
};

export const Sizes: Story = {
  name: 'Размеры (матрица)',
  render: () => (
    <div style={{ alignItems: 'flex-start', display: 'flex', gap: 24 }}>
      <Loader size="sm" label="sm" />
      <Loader size="md" label="md" />
      <Loader size="lg" label="lg" />
    </div>
  ),
};

export const InsideCard: Story = {
  name: 'В карточке (макет блока дашборда)',
  render: () => (
    <Card style={{ width: 360 }}>
      <Loader label="Загрузка сводки…" />
    </Card>
  ),
};

/**
 * Ключевая история критерия готовности (DoD MM-209): три состояния
 * данных в одинаковых карточках. Визуально видно, что загрузка,
 * пустой список и ошибка занимают один и тот же каркас.
 */
export const ThreeStates: Story = {
  name: 'Три состояния данных (DoD: единообразие)',
  render: () => (
    <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(3, 260px)' }}>
      <Card>
        <Loader label="Загрузка заказов…" />
      </Card>
      <Card>
        <EmptyState
          title="Заказы не найдены"
          description="Попробуйте изменить параметры фильтрации."
        />
      </Card>
      <Card>
        <ErrorState
          title="Не удалось загрузить заказы"
          description="Сервер недоступен. Повторите попытку."
          onRetry={() => {}}
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
        padding: 24,
      }}
    >
      <Card>
        <Loader label="Загрузка сводки…" />
      </Card>
    </div>
  ),
};
