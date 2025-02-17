import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['node_modules/', 'dist/'],
  },
  js.configs.recommended,
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'no-console': 'warn',
    },
    languageOptions: {
      ecmaVersion: 'latest',
    },
  },
];
