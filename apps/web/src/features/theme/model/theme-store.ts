import { create } from 'zustand';

/** Варианты темы интерфейса (док. 6, §15.9). */
export type Theme = 'light' | 'dark';

/**
 * Ключ выбранной темы в localStorage.
 *
 * Дублируется в инлайн-скрипте apps/web/index.html: тот скрипт
 * восстанавливает тему до загрузки бандла (чтобы не было «мигания»)
 * и не может импортировать TS-модули. Меняя ключ, правьте оба места.
 */
const THEME_STORAGE_KEY = 'mini-mes/theme';

/**
 * Читает сохранённую тему. По умолчанию — светлая.
 *
 * Проверки — защитные:
 * - `typeof window === 'undefined'` — страховка от небраузерного
 *   окружения (SSR, тесты вне jsdom); в SPA его нет, но проверка бесплатна;
 * - try/catch — в некоторых браузерах обращение к localStorage
 *   может бросать исключение (например, в приватном режиме).
 */
const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light';
  }
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

/**
 * Применяет тему: ставит атрибут на <html> и сохраняет выбор в localStorage.
 * Набор CSS-переменных переключается селектором [data-theme='dark']
 * (док. 6, §15.9; спецификация MES-MF §18.9).
 */
const applyTheme = (theme: Theme): void => {
  document.documentElement.dataset.theme = theme;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Хранилище недоступно — тема будет жить до перезагрузки страницы.
  }
};

interface ThemeStore {
  /** Активная сейчас тема. */
  theme: Theme;
  /** Установить заданную тему. Повторный вызов с тем же значением — no-op. */
  setTheme: (theme: Theme) => void;
  /** Переключить светлую <-> тёмную. */
  toggleTheme: () => void;
}

/**
 * Zustand-стор клиентского состояния темы (док. 5, §2.3).
 *
 * Побочные эффекты (атрибут на <html> и localStorage) живут в экшенах стора,
 * а не в компонентах: логика переключения собрана в одном месте,
 * компоненты остаются тонкими.
 */
export const useThemeStore = create<ThemeStore>()((set, get) => ({
  theme: getInitialTheme(),
  setTheme: (theme) => {
    if (get().theme === theme) {
      return; // идемпотентность: не переписываем хранилище тем же значением
    }
    applyTheme(theme);
    set({ theme });
  },
  toggleTheme: () => {
    const next: Theme = get().theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    set({ theme: next });
  },
}));
