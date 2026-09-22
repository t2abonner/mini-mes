import type { Meta, StoryObj } from '@storybook/react';
import { FieldError } from './FieldError';

const meta: Meta<typeof FieldError> = {
  title: 'UI/FieldError',
  component: FieldError,
  args: {
    children: 'Обязательное поле',
  },
};

export default meta;

type Story = StoryObj<typeof FieldError>;

export const Default: Story = {};

export const Empty: Story = {
  name: 'Без текста (ничего не рендерит)',
  args: { children: undefined },
};
