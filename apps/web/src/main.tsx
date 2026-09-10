import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/App';

// index.html отдаёт нам «розетку» — контейнер #root
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Не найден контейнер #root: проверьте index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
