import { SassOptions } from '../@types/sass-options.js';
export default abstract class SassConfig {
    private static config;
    static getConfig(): SassOptions;
    static setConfig(config: SassOptions): void;
}
export declare const getConfig: typeof SassConfig.getConfig, setConfig: typeof SassConfig.setConfig;
