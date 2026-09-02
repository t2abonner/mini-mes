# Регламент разработки MES-MF

## Ветки

- Единственная долгоживущая ветка — `main`.
- Формат: `<type>/MM-<номер>-<описание>`, типы: feat|fix|chore|docs|refactor|test.

## Коммиты (Conventional Commits)

- Формат: `<type>(<scope>): <описание> (MM-XXX)`.
- Scopes: root|web|api|ui|contracts|validation.
- Один коммит — одно изменение; императив; ≤ 72 символов.

## Pull Request

- Название — в формате коммита; в описании `Closes #<номер issue>`.
- Merge только squash.

## Модель ветвления: GitHub Flow

Правила:

1. `main` — всегда в рабочем состоянии, напрямую в неё не коммитим.
2. Каждая задача = своя ветка от свежего `main`.
3. Завершил → Pull Request → ревью (тех. лид.) → squash-merge в `main` → ветка удаляется.

```
main      ────●─────────●─────────●─────────●────►
               \       / \       / \       /
  фича-ветки    ●──●──●   ●──●   ●──●──●──●      (живут 1–3 дня)
                MM-101   MM-102    MM-103

```

## Рабочий цикл одной задачи

1. Всегда начинаем со свежего main  
   `git checkout main && git pull`

2. Ветка по регламенту  
   `git checkout -b chore/MM-101-monorepo-init`

3. Работаем, коммитим по регламенту  
   `git add .`  
   `git commit -m "chore(root): инициализировать монорепозиторий с npm workspaces (MM-101)"`

4. Публикуем и открываем PR (название — в формате коммита, в описании Closes #1)  
   `git push -u origin chore/MM-101-monorepo-init`
