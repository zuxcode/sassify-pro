interface CompilerInterFace {
    sourceFile: string;
    outputDirectory: string;
    style?: 'compressed' | 'expanded';
    sourceMp?: boolean;
    quietDeps?: boolean;
}
export default class Compiler {
    private static preCompile;
    static compileSass(props: CompilerInterFace): Promise<void>;
}
export declare const compileSass: typeof Compiler.compileSass;
export {};
