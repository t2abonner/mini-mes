import { ThemeToggle, useThemeStore } from '../features/theme';
import styles from './App.module.css';

/**
 * Временный демонстрационный экран фичи темы (MM-210).
 * В спринте 3 переключатель переедет в шапку приложения (виджет лэйаута).
 */
export const App = () => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <main className={styles.demo}>
      <h1>Mini-MES</h1>
      <p>Текущая тема: {theme === 'dark' ? 'тёмная' : 'светлая'}</p>
      <ThemeToggle />
    </main>
  );
};
