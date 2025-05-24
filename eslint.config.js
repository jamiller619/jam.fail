/** @type {import('eslint').Linter.Config} */
import typescriptParser from '@typescript-eslint/parser';
import astroParser from 'astro-eslint-parser';
import eslingPluginAstro from 'eslint-plugin-astro';

export default [
  {
    plugins: {
      eslingPluginAstro,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        tsconfigRootDir: '.',
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
  },
  {
    files: ['*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: typescriptParser,
        extraFileExtensions: ['.astro'],
      },
    },
  },
];
