// @ts-check

import eslint from '@rollup/plugin-eslint';
import { defineConfig } from 'rollup';
import { defineRollupSwcOption, swc } from 'rollup-plugin-swc3';

export default [true, false].map((isDev) =>
  defineConfig({
    input: './src/index.ts',

    plugins: [
      isDev && eslint({ throwOnError: true }),

      swc(
        defineRollupSwcOption({
          minify: !isDev,
          sourceMaps: true,

          jsc: {
            transform: { useDefineForClassFields: false },
            minify: { compress: !isDev, mangle: !isDev, sourceMap: true },
          },
        }),
      ),
    ],

    output: {
      file: `./dist/index.${isDev ? 'development' : 'production'}.js`,
      format: 'esm',
      sourcemap: true,
    },
  }),
);
