import typescript from 'rollup-plugin-typescript2';
import shebang from 'rollup-plugin-preserve-shebang';

export default {
  input: 'lib/index.ts',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
    },
    {
      file: 'dist/index.js',
      format: 'esm',
    },
  ],
  plugins: [typescript(), shebang()],
};
