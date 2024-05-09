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
};
