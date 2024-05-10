// @ts-check

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: { node: true, browser: true },
  parserOptions: { project: true, tsconfigRootDir: __dirname },
  ignorePatterns: ['/dist', '.eslintrc.cjs', 'rollup.config.js'],
  settings: { 'import/resolver': { typescript: { alwaysTryTypes: true } } },

  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
  ],

  rules: {
    //* ESLint
    'consistent-return': 'off',
    'no-return-assign': ['off', 'except-parens'],

    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],

    //* TypeScript
    '@typescript-eslint/lines-between-class-members': 'off',

    '@typescript-eslint/no-unused-vars': [
      'warn',
      { ignoreRestSiblings: false },
    ],

    //* Import
    'import/prefer-default-export': 'off',

    //* Unicorn
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',

    'unicorn/filename-case': [
      'error',
      { cases: { camelCase: true, pascalCase: true } },
    ],
  },
};
