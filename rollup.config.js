import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'lib/index.ts',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
    },
    {
      file: 'dist/index.mjs',
      format: 'esm',
    },
  ],
  plugins: [typescript()],
};
