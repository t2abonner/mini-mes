import { Moon, Sun } from 'lucide-react';
import { Button } from '../../../shared/ui';
import { useThemeStore } from '../model/theme-store';

/**
 * Кнопка переключения темы (док. 6, §15.9).
 *
 * Значения стора читаются отдельными селекторами: Zustand перерисовывает
 * компонент только при изменении выбранного «среза». Экшены (toggleTheme)
 * имеют стабильную ссылку — они создаются один раз при создании стора.
 *
 * На кнопке показана ЦЕЛЬ переключения: в тёмной теме — солнце
 * (клик приведёт к светлой), в светлой — луна. aria-label описывает действие.
 */
export const ThemeToggle = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const isDark = theme === 'dark';

  return (
    <Button
      variant="secondary"
      onClick={toggleTheme}
      aria-label={isDark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
    >
      {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
      {isDark ? 'Светлая тема' : 'Тёмная тема'}
    </Button>
  );
};
