import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // Где искать истории: все *.stories.ts(x) внутри src
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  // Аддоны: контролы, Docs, actions и пр.
  addons: ['@storybook/addon-essentials'],
  // Фреймворк: рендерим истории на Vite (наши CSS Modules «заведутся» сами)
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // Автогенерация таблицы пропов из TS-типов компонента
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
