import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  '@material-ui/core': 'MaterialUI',
};

export default {
  input: './src/index.ts',
  external: [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.devDependencies),
  ],
  output: [
    {
      file: `./dist/${pkg.main}`,
      format: 'cjs',
      globals,
      sourcemap: true,
    },
    {
      file: `./dist/${pkg.module}`,
      format: 'es',
      globals,
      sourcemap: true,
    },
    {
      file: `./dist/${pkg.browser}`,
      format: 'iife',
      name: 'lib',
      globals,
      sourcemap: true,
    },
  ],
  plugins: [
    commonjs(),
    postcss({
      plugins: [
        require('postcss-easy-import')({ prefix: '_' }), // keep this first
        require('cssnano')({
          preset: 'default',
        }),
      ],
    }),
    typescript(),
    terser(),
  ],
};
