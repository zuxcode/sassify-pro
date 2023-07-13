import { SassOptions } from '../@types/sass-options.js';
export default class Compiler {
    private static preCompile;
    static compileSass(props: SassOptions): Promise<void>;
}
export declare const compileSass: typeof Compiler.compileSass;
