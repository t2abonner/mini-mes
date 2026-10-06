import { useEffect, useState } from 'react';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      description: 'Недоступное состояние',
    },
    invalid: {
      control: { type: 'boolean' },
      description: 'Состояние ошибки поля',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Текст при отсутствии выбора',
    },
  },
  args: {
    placeholder: 'Выберите значение',
    onValueChange: () => {},
    options: [
      { value: 'cutting', label: 'Раскрой' },
      { value: 'edging', label: 'Кромление' },
      { value: 'drilling', label: 'Сверление' },
      { value: 'milling', label: 'Фрезерная обработка' },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

/**
 * Контролируемая обёртка для базовых историй.
 * Значение живёт в состоянии истории, поэтому выбор отображается сразу,
 * а компонент ведёт себя так же, как в реальном приложении.
 */
const ControlledSelect = (args: ComponentProps<typeof Select>) => {
  const [value, setValue] = useState<string | undefined>(args.value);

  return <Select {...args} value={value} onValueChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <ControlledSelect {...args} />,
};

export const WithPlaceholder: Story = {
  args: {
    value: undefined,
  },
  render: (args) => <ControlledSelect {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => <ControlledSelect {...args} />,
};

export const Invalid: Story = {
  args: {
    invalid: true,
  },
  render: (args) => <ControlledSelect {...args} />,
};

export const WithDisabledOption: Story = {
  name: 'С недоступной опцией',
  args: {
    options: [
      { value: 'cutting', label: 'Раскрой' },
      { value: 'edging', label: 'Кромление', disabled: true },
      { value: 'drilling', label: 'Сверление' },
      { value: 'milling', label: 'Фрезерная обработка' },
    ],
  },
  render: (args) => <ControlledSelect {...args} />,
};

/**
 * Отдельный компонент для истории с доменными примерами.
 * Хуки (useState) живут внутри настоящего React-компонента,
 * чтобы не нарушать rules-of-hooks.
 */
const DomainExamplesComponent = () => {
  const [status, setStatus] = useState('all');
  const [zone, setZone] = useState('all');
  const [deviation, setDeviation] = useState('all');

  return (
    <div style={{ display: 'grid', gap: 16, width: 360 }}>
      <div style={{ display: 'grid', gap: 4 }}>
        <label htmlFor="filter-status" style={{ color: 'var(--color-text)', fontSize: 14 }}>
          Статус заказа
        </label>
        <Select
          id="filter-status"
          value={status}
          onValueChange={setStatus}
          options={[
            { value: 'all', label: 'Все статусы' },
            { value: 'waiting_materials', label: 'Ожидание материалов' },
            { value: 'in_production', label: 'В производстве' },
            { value: 'completed', label: 'Выполнен' },
          ]}
        />
      </div>

      <div style={{ display: 'grid', gap: 4 }}>
        <label htmlFor="filter-zone" style={{ color: 'var(--color-text)', fontSize: 14 }}>
          Операционная зона
        </label>
        <Select
          id="filter-zone"
          value={zone}
          onValueChange={setZone}
          options={[
            { value: 'all', label: 'Все зоны' },
            { value: 'cutting', label: 'Раскрой' },
            { value: 'edging', label: 'Кромление' },
            { value: 'drilling', label: 'Сверление' },
            { value: 'milling', label: 'Фрезерная обработка' },
          ]}
        />
      </div>

      <div style={{ display: 'grid', gap: 4 }}>
        <label htmlFor="filter-deviation" style={{ color: 'var(--color-text)', fontSize: 14 }}>
          Отклонение от плана
        </label>
        <Select
          id="filter-deviation"
          value={deviation}
          onValueChange={setDeviation}
          options={[
            { value: 'all', label: 'Не важно' },
            { value: 'deviated', label: 'Есть отклонение' },
            { value: 'on_track', label: 'Без отклонения' },
          ]}
        />
      </div>
    </div>
  );
};

export const DomainExamples: Story = {
  name: 'Доменные примеры (фильтры дашборда)',
  render: () => <DomainExamplesComponent />,
};

/**
 * Отдельный компонент для истории с тёмной темой.
 * Хуки живут внутри настоящего React-компонента.
 */
const DarkThemeComponent = () => {
  const [value, setValue] = useState('edging');

  // Portal рендерит Select.Content в document.body, то есть ВНЕ обёртки
  // с data-theme. Чтобы выпадающий список получил тёмные токены, ставим
  // тему на <html> — ровно так, как это делает приложение (док. 6, §15.9).
  // При размонтировании истории возвращаем прежнюю тему.
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
        width: 320,
      }}
    >
      <Select
        value={value}
        onValueChange={setValue}
        options={[
          { value: 'cutting', label: 'Раскрой' },
          { value: 'edging', label: 'Кромление' },
          { value: 'drilling', label: 'Сверление' },
          { value: 'milling', label: 'Фрезерная обработка' },
        ]}
      />
    </div>
  );
};

export const DarkTheme: Story = {
  name: 'Тёмная тема',
  render: () => <DarkThemeComponent />,
};
