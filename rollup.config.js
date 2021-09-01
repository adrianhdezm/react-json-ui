import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const commonPlugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  typescript({
    tsconfigOverride: {
      compilerOptions: {
        declaration: false
      }
    }
  }),
  terser()
];

export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'ReactJsonUI',
      file: pkg.browser,
      format: 'umd',
      globals: {
        react: 'React'
      }
    },
    external: Object.keys(pkg.peerDependencies),
    plugins: [
      commonjs(),
      nodeResolve({
        browser: true
      }),
      ...commonPlugins
    ]
  },
  {
    input: 'src/index.ts',
    external: Object.keys(pkg.peerDependencies),
    plugins: [...commonPlugins],
    output: [
      { file: pkg.main, format: 'cjs', exports: 'auto' },
      { file: pkg.module, format: 'es' }
    ]
  }
];
