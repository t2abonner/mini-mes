import {
  baseConfig,
  nodeConfig,
  prettierEslintConfig,
  reactConfig,
  withFiles,
} from '@mini-mes/eslint-config';

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/storybook-static/**',
      '**/*.mjs',
      '**/*.cjs',
      'package-lock.json',
      'docs/**',
    ],
  },
  ...baseConfig,
  ...withFiles(reactConfig, ['apps/web/**/*.{ts,tsx}', 'packages/ui/**/*.{ts,tsx}']),
  ...withFiles(nodeConfig, ['apps/mock-api/**/*.ts']),
  prettierEslintConfig,
];
