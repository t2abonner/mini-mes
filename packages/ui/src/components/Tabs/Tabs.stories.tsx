import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  name: 'Неконтролируемый (defaultValue)',
  render: () => (
    <Tabs defaultValue="summary" style={{ width: 420 }}>
      <TabsList>
        <TabsTrigger value="summary">Сводка</TabsTrigger>
        <TabsTrigger value="machines">Станки</TabsTrigger>
        <TabsTrigger value="downtimes">Простой</TabsTrigger>
      </TabsList>
      <TabsContent value="summary">Сводная статистика за текущую смену.</TabsContent>
      <TabsContent value="machines">Загрузка станочного парка.</TabsContent>
      <TabsContent value="downtimes">Время простоя оборудования.</TabsContent>
    </Tabs>
  ),
};

/**
 * Контролируемый режим: активной вкладкой владеет родитель
 * через value + onValueChange. Отдельный компонент, чтобы
 * хуки жили по правилам (паттерн из Select.stories).
 */
const ControlledDemo = () => {
  const [value, setValue] = useState('orders');
  return (
    <div style={{ display: 'grid', gap: 12, width: 420 }}>
      <Tabs value={value} onValueChange={setValue}>
        <TabsList>
          <TabsTrigger value="orders">Заказы</TabsTrigger>
          <TabsTrigger value="waiting">Ожидание материалов</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">Список активных производственных заказов.</TabsContent>
        <TabsContent value="waiting">Заказы, ожидающие поступления материалов.</TabsContent>
      </Tabs>
      <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
        Активная вкладка из состояния: {value}
      </p>
    </div>
  );
};

export const Controlled: Story = {
  name: 'Контролируемый (внешнее состояние)',
  render: () => <ControlledDemo />,
};

export const DisabledTab: Story = {
  name: 'Недоступная вкладка',
  render: () => (
    <Tabs defaultValue="task" style={{ width: 420 }}>
      <TabsList>
        <TabsTrigger value="task">Задание</TabsTrigger>
        <TabsTrigger value="docs" disabled>
          Документы
        </TabsTrigger>
        <TabsTrigger value="history">История</TabsTrigger>
      </TabsList>
      <TabsContent value="task">Текущее задание оператора.</TabsContent>
      <TabsContent value="docs">Сюда нельзя попасть: вкладка недоступна.</TabsContent>
      <TabsContent value="history">Хронология операций.</TabsContent>
    </Tabs>
  ),
};

export const WithBadges: Story = {
  name: 'Счётчики на вкладках (композиция с Badge)',
  render: () => (
    <Tabs defaultValue="defects" style={{ width: 420 }}>
      <TabsList>
        <TabsTrigger value="defects">
          Брак <Badge variant="destructive">6</Badge>
        </TabsTrigger>
        <TabsTrigger value="downtimes">
          Простой <Badge variant="warning">2</Badge>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="defects">6 забракованных деталей за смену.</TabsContent>
      <TabsContent value="downtimes">2 зафиксированных простоя станков.</TabsContent>
    </Tabs>
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
        padding: 24,
      }}
    >
      <Tabs defaultValue="summary" style={{ width: 420 }}>
        <TabsList>
          <TabsTrigger value="summary">Сводка</TabsTrigger>
          <TabsTrigger value="machines">Станки</TabsTrigger>
          <TabsTrigger value="downtimes">Простой</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          Полоса вкладок и активное подчёркивание читаются в тёмной теме.
        </TabsContent>
        <TabsContent value="machines">Панель станков.</TabsContent>
        <TabsContent value="downtimes">Простои за смену.</TabsContent>
      </Tabs>
    </div>
  ),
};
