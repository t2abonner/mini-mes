/**
 * Конфигурация lint-staged: какие задачи запускать на каких файлах
 * при прекоммите. Проверяются ТОЛЬКО файлы, добавленные в индекс (staged).
 * Документация: https://github.com/lint-staged/lint-staged
 */
export default {
  // Исходники на TypeScript: сначала чиним линтером, затем форматируем
  '**/*.{ts,tsx}': ['eslint --fix', 'prettier --write'],

  // Стили: в этом спринте CSS ещё нет, но со спринта 2 будет много
  '**/*.css': ['stylelint --fix', 'prettier --write'],

  // Всё остальное, что умеет форматировать prettier.
  // package-lock.json и *.md исключены через .prettierignore — он пропустит их сам.
  '**/*.{js,mjs,cjs,json,md,yml,yaml}': ['prettier --write'],
};
