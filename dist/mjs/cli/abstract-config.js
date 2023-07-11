import path from 'node:path';
export default class CompilerConfig {
    static config = {
        autoprefixer: true,
        outputDir: 'public',
        sourceDir: path.basename(process.cwd()),
        style: 'expanded',
        sourceMap: true,
        watch: false,
        excludePaths: /\/node_modules\/*\//,
        importPaths: [],
        quietDeps: false,
        sourceMapIncludeSources: false,
        verbose: false,
    };
    static getConfig() {
        return CompilerConfig.config;
    }
}
export const { getConfig } = CompilerConfig;
