import path from 'node:path';
export default class SassConfig {
    static config = {
        autoprefixer: true,
        outputDir: 'public',
        sourceDir: path.basename(process.cwd()),
        style: 'expanded',
        watch: false,
        excludePaths: /\/node_modules\/*\//,
        importPaths: [],
    };
    static getConfig() {
        return SassConfig.config;
    }
    static setConfig(config) {
        SassConfig.config = { ...SassConfig.getConfig(), ...config };
    }
}
export const { getConfig, setConfig } = SassConfig;
