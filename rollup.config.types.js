import typescript from 'rollup-plugin-typescript2';
import shebang from 'rollup-plugin-preserve-shebang';

export default {
  input: 'tmp/out/index.d.ts',
  output: [
    {
      file: 'dist/@types/sassify-pro.d.ts',
    },
  ],
  plugins: [typescript(), shebang()],
};
