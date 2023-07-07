export type TypeStyle = 'compressed' | 'expanded' | 'minified';
export interface ConfigInterface {
    sourceDir?: string;
    outputDir?: string;
    watch?: boolean;
    sourceMap?: boolean;
    importPaths?: string[];
    excludePaths?: RegExp;
    style?: TypeStyle[];
    quietDeps?: boolean;
    sourceMapIncludeSources?: boolean;
    autoprefixer?: boolean;
    verbose?: boolean;
}
