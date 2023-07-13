import { Options } from 'sass';
export interface SassOptions extends Options<'async'> {
    outputDir?: string;
    autoprefixer?: boolean;
    excludePaths?: RegExp;
    importPaths?: string[];
    watch?: boolean;
    sourceDir?: string;
}
