import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './Card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  name: 'Полная композиция',
  render: () => (
    <Card style={{ width: 360 }}>
      <CardHeader>
        <CardTitle>Заказ-000123</CardTitle>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0 }}>
          Клиент: ИП Петров. Карточка собирается из секций CardHeader, CardContent и CardFooter —
          потребитель использует только нужные.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary">Отмена</Button>
        <Button>Запустить</Button>
      </CardFooter>
    </Card>
  ),
};

export const FlushContent: Story = {
  name: 'Содержимое без секций (вплотную к краям)',
  render: () => (
    <Card style={{ width: 360 }}>
      <div style={{ backgroundColor: 'var(--color-hover)', padding: 16 }}>
        У карточки нет собственных отступов: если не оборачивать содержимое в секции, оно ляжет
        вплотную к краям. Так в дашборде в карточку ляжет таблица заказов.
      </div>
    </Card>
  ),
};

export const MachineCardExample: Story = {
  name: 'Карточка станка (макет панели станков)',
  render: () => (
    <Card style={{ width: 320 }}>
      <CardHeader>
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
          <CardTitle>KS-01 · Пильный центр</CardTitle>
          <Badge variant="success">Работает</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <dl style={{ display: 'grid', gap: 4, gridTemplateColumns: 'auto 1fr', margin: 0 }}>
          <dt style={{ color: 'var(--color-text-secondary)' }}>Модель</dt>
          <dd style={{ margin: 0 }}>KDT KS-832H</dd>
          <dt style={{ color: 'var(--color-text-secondary)' }}>Зона</dt>
          <dd style={{ margin: 0 }}>Раскрой</dd>
          <dt style={{ color: 'var(--color-text-secondary)' }}>Заказ</dt>
          <dd style={{ margin: 0 }}>Заказ-000123, партия 1</dd>
        </dl>
      </CardContent>
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
      <Card style={{ width: 320 }}>
        <CardHeader>
          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
            <CardTitle>KE-01 · Кромление</CardTitle>
            <Badge variant="warning">Обслуживание</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p style={{ margin: 0 }}>Карточка и бейджи корректно читаются в тёмной теме.</p>
        </CardContent>
      </Card>
    </div>
  ),
};
