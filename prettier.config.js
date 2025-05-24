/** @type {import('prettier').Config} */

export default {
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  bracketSameLine: true,
  pluginSearchDirs: false,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
