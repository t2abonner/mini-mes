import { useEffect, useState } from 'react';
import styles from './App.module.css';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'mini-mes/theme';

const getInitialTheme = (): Theme => {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'dark' ? 'dark' : 'light';
};

// Временный демонстрационный экран для проверки дизайн-токенов (MM-201).
// Позже тема будет вынесена в отдельный фича-модуль и провайдеры приложения.
export const App = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <main className={styles.demo}>
      <h1>Mini-MES</h1>
      <p>Текущая тема: {theme === 'dark' ? 'тёмная' : 'светлая'}</p>
      <button
        type="button"
        className={styles.toggleButton}
        onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      >
        Переключить тему
      </button>
    </main>
  );
};
