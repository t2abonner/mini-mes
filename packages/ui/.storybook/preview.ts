import type { Preview } from '@storybook/react';

// Подключаем дизайн-токены ДО рендера любой истории:
// без этого кнопка не получит цвета из --color-*
import '../src/styles/tokens.css';

const preview: Preview = {
  parameters: {
    // Центрируем истории в канве — для кнопок так нагляднее
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
