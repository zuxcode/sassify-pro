export default class CompilerConfig {
    static config = {
        autoprefixer: true,
        outputDir: 'public',
        sourceDir: 'src',
        style: ['expanded', 'compressed'],
        sourceMap: true,
        watch: false,
        excludePaths: /\/node_modules\/*\//,
        importPaths: [],
        quietDeps: false,
        sourceMapIncludeSources: false,
        verbose: false,
    };
    static setConfig(props) {
        CompilerConfig.config = props(CompilerConfig.config);
    }
    static getConfig() {
        return CompilerConfig.config;
    }
}
export const { getConfig, setConfig } = CompilerConfig;
